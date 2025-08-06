import { prisma } from "@/Utils/db";
import { RegisterUserDto } from "@/Utils/dtos";
import { registerSchema } from "@/Utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/Utils/generateToken";

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method POST
 * @route ~/api/users/register //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Create New User [(Register) (Sign up) (إنشاء حساب)]
 * @access public // يعني الكل يوصل له
*/

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RegisterUserDto;
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (user) {
            return NextResponse.json(
                { message: 'this user already registered' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
                isAdmin: body.isAdmin // هنا نقوم بتحديد ان المستخدم ليس ادمن
            },
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true,
            }
        });

        const cookie = setCookie({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        })

        return NextResponse.json(
            { ...newUser, message: 'user created successfully' },
            {
                status: 201,
                headers: {
                    'Set-Cookie': cookie // هنا نضع الكوكيز في الهيدر لكي يتم ارسالها للمتصفح
                }
            });

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'internal server error!' },
            { status: 500 }
        );
    }
}