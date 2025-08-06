import bcrypt from 'bcryptjs';
import { UpdateUserDto } from './../../../../../Utils/dtos';
import { prisma } from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/Utils/verifyToken";
import { updateUserSchema } from '@/Utils/validationSchemas';

interface Props {
    params: {
        id: string
    }
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/users/profile/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Get User by id (Delete Profile)
 * @access private (only user himself can get his account/profile) 
*/

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true,
                createdAt: true,
            }
        });

        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);

        if (userFromToken !== null && userFromToken.id === user.id) {
            return NextResponse.json(user, { status: 200 });
        }

        return NextResponse.json(
            { message: 'only user himself can get his account/profile, forbidden' },
            { status: 403 }); //403 forbidden

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method PUT
 * @route ~/api/users/profile/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Update User by id (Delete Profile)
 * @access private (only user himself can update his account/profile) 
*/

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const body = await request.json() as UpdateUserDto;
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);

        const validation = updateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 }); //400 bad request
        }

        if (userFromToken !== null && userFromToken.id === user.id) {
            if (body.password) {
                const salt = await bcrypt.genSalt(10);
                body.password = await bcrypt.hash(body.password, salt); // هنا نقوم بتشفير كلمة المرور الجديدة
            }
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(params.id) },
                data: {
                    username: body.username,
                    email: body.email,
                    password: body.password,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    isAdmin: true,
                    createdAt: true,
                }
            });
            return NextResponse.json(updatedUser, { status: 200 });
        }

        return NextResponse.json(
            { message: 'only user himself can update his account/profile, forbidden' },
            { status: 403 }); //403 forbidden

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method DELETE
 * @route ~/api/users/profile/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Delete User by id (Delete Profile)
 * @access private (only user himself can delete his account) 
*/

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        // ترتيب الخطوات مهم لكي لا يعمل اي كود قبل الاخر لانه ينفذ سطر بعد سطر
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(params.id) },
            include: { comment: true } }); // هنا نحصل على التعليقات التابعه للمستخدم المراد حذفها
        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 }); // في حالة المستخدم غير موجود
        }

        const userFromToken = verifyToken(request); // هنا نحصل على المستخدم من التوكن والفريفاي توكن هذه استدعيناها من الفانكشن في مجلد Utils ملف verifyToken.ts

        // if (!authToken) { // في حالة عدم وجود التوكن
        //     return NextResponse.json(
        //         { message: 'not token provided, access denied' },
        //         { status: 401 }); //unauthorized 401
        // } خلاص نقلنا هذا الكود للميدل وير

        if (userFromToken !== null && userFromToken.id === user.id) { // في حالة وجود التوكن وهو مطابق للمستخدم المراد حذفه
            
            // هنا نقوم بحذف المستخدم من قاعدة البيانات
            await prisma.user.delete({ where: { id: parseInt(params.id) } });

            // هنا نقوم بحذف جميع التعليقات التي كتبها هذا المستخدم
            await prisma.comment.deleteMany({
                where: { userId: parseInt(params.id) } // هنا نقوم بحذف جميع التعليقات التي كتبها هذا المستخدم
            });
            return NextResponse.json(
                { message: 'user deleted successfully' },
                { status: 200 });
        }

        return NextResponse.json(
            { message: 'only user himself can delete his account, forbidden' },
            { status: 403 }); //403 forbidden

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }

}