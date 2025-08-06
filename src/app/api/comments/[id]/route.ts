import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";
import { UpdateCommentDto } from "@/Utils/dtos";


interface Props {
    params: { id: string };
}


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method PUT
 * @route ~/api/coomments/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Update Comment
 * @access private (only owner can update comment)
*/

export async function PUT(req: NextRequest, { params }: Props) {
    try {

        const comment = await prisma.comment.findUnique({ // هنا نحصل على التعليق المراد تحديثه
            where: { id: parseInt(params.id) }, // هنا نبحث عن التعليق باستخدام ال ID الخاص به
            include: { user: true } // هنا نضمن أن نحصل على معلومات المستخدم الذي كتب التعليق اي نجلب بياناته
        });

        if (!comment) { // إذا لم يتم العثور على التعليق
            return NextResponse.json({ message: 'comment not found' }, { status: 404 }); // not found
        }

        const user = verifyToken(req);
        if (user === null || user.id !== comment.userId) { // هنا نتحقق من المستخدم إذا كان غير موجود يعني ربما يكون ما عنده توكن أو ليس هو مالك التعليق
            return NextResponse.json({ message: 'you are not allowed to update this comment, access denied' }, { status: 403 }); // forbidden
        }

        const body = await req.json() as UpdateCommentDto; // هنا نحصل على البيانات الجديدة من الطلب

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(params.id) }, // هنا نحدد التعليق الذي نريد تحديثه
            data: {
                text: body.text, // هنا نحدد التعليق الذي نريد تحديثه
            },
        });

        return NextResponse.json(updatedComment, { status: 200 }); // OK
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method DELETE
 * @route ~/api/coomments/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Delete Comment
 * @access private (only Admin or owner can delete comment)
*/

export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) },
            include: { user: true }
        });

        if (!comment) {
            return NextResponse.json({ message: 'comment not found' }, { status: 404 });
        }

        const user = verifyToken(req);
        if (user === null || (user.id !== comment.userId && !user.isAdmin)) {
            return NextResponse.json({ message: 'you are not allowed to delete this comment, access denied' }, { status: 403 });
        }

        await prisma.comment.delete({ where: { id: parseInt(params.id) } });

        return NextResponse.json({ message: 'comment deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}
