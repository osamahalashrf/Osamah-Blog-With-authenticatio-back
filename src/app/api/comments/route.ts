import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";
import { CreateCommentDto } from "@/Utils/dtos";
import { createCommentSchema } from "@/Utils/validationSchemas";


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method POST
 * @route ~/api/coomments //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Create Comment
 * @access private // يعني الكل يوصل له
*/

export async function POST(req: NextRequest) {
    try {
        const user = verifyToken(req);
        if (!user) {
            return NextResponse.json({ message: 'not token provided, access denied' }, { status: 401 }); // unauthorized
        }
        const body = await req.json() as CreateCommentDto;
        const validation = createCommentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        const comment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id // هنا نربط التعليق بالمستخدم الذي قام بإنشائه
            }
        });
        return NextResponse.json(comment, { status: 201 }); // 201 Created
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/coomments //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Get All Comment
 * @access private (only admin) // يعني الكل يوصل له
*/

export async function GET(req: NextRequest) {
    try {
        const user = verifyToken(req);
        if (user === null || user.isAdmin === false) { // هنا نتحقق من المستخدم إذا كان غير موجود أو ليس مديرًا
            
            return NextResponse.json({ message: 'only admin can get all comments, access denied' }, { status: 403 }); // forbidden
        }
        const comments = await prisma.comment.findMany({
            include: {
                user: true, // هنا نربط التعليق بالمستخدم الذي قام بإنشائه
                article: true // هنا نربط التعليق بالمقال الذي ينتمي إليه
            }
        });
        return NextResponse.json(comments, { status: 200 }); // 200 OK
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}