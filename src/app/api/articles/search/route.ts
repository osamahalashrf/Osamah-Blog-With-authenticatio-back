import { prisma } from "@/Utils/db";
import { NextRequest, NextResponse } from "next/server";


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/articles/search?searchText=value //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Get Article by search
 * @access public
*/


export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get('searchText'); // نحصل على نص البحث من باراميترز الرابط
        let articles; // هنا نعرف متغير المقالات الذي سيحتوي على نتائج البحث
        // إذا كان نص البحث موجودا
        if (searchText) {
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        //equals: searchText, هذا يجيب لك النتائج بنفص نص البحث 
                        startsWith: searchText, // هذا اوسع من الايكولز يعني يجيب لك كل النتائج التي تحتوي نص البحث حتى ولو كان جزء منها
                        mode: 'insensitive' // يعني غير حساس لحالة الحروف
                    }
                }
            })
        } else { // إذا لم يكن هناك نص بحث، نرجع آخر 6 مقالات
            articles = await prisma.article.findMany({ take: 6 })
        }

        return NextResponse.json(articles, { status: 200 })

    } catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}