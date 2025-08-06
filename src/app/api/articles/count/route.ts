import { prisma } from "@/Utils/db";
import { NextResponse } from "next/server";


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/articles/count
 * @desc Get Article count
 * @access public
*/

// وظيفة هذا الراوت يعطينا عدد المقالات التي في قاعدة البيانات

export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({ count }, { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}