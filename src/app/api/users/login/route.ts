import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import bcrypt from 'bcryptjs';
import { LoginUserDto } from "@/Utils/dtos";
import { loginSchema } from "@/Utils/validationSchemas";
import { setCookie } from "@/Utils/generateToken";
/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method POST
 * @route ~/api/users/login //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Login User [(Log in) (Sign in) (تسجيل الدخول)]
 * @access public // يعني الكل يوصل له
*/

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        const cookie = setCookie({
            id: user.id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin
        }); // هنا نقوم بتوليد التوكن من البيانات التي فوق
        return NextResponse.json(
            { message: 'login successfully' },
            {
                status: 200,
                headers: {
                    'Set-Cookie': cookie // هنا نضع الكوكيز في الهيدر لكي يتم ارسالها للمتصفح
                }
            }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}