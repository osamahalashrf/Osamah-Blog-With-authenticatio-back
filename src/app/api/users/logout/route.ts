
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/users/logout //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Logout User [(Log out) (تسجيل الخروج)]
 * @access Private // يعني الكل يوصل له
*/

export async function GET() {
    try {
        cookies().delete("jwtToken"); // نقوم بحذف الكوكيز التي تحمل التوكن
        return NextResponse.json(
            { message: 'Logout successfully' },
            { status: 200 }
        );

    } catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        );
    }
}