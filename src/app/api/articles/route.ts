import { CreateArticleDto } from "@/Utils/dtos";
import { createArticleSchema } from "@/Utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { ARTICLE_PER_PAGE } from "@/Utils/constants";
import { verifyToken } from "@/Utils/verifyToken";
import { Article } from "@/generated/prisma";



/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/articles //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Get Articles by Page Number
 * @access public // يعني الكل يوصل له
*/


export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"; // نحصل على رقم الصفحة من باراميترز الرابط
        
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1), // تخطي المقالات حسب الصفحة
            take: ARTICLE_PER_PAGE, // أخذ عدد المقالات المحدد لكل صفحة
            orderBy: {
                createdAt: 'desc' // ترتيب المقالات حسب تاريخ الإنشاء تصاعديًا
            }
        });

        return NextResponse.json(articles, { status: 200 }); // إرجاع المقالات كاستجابة JSON مع حالة 200

    } catch {

        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}



/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method POST
 * @route ~/api/articles //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Create New Articles
 * @access Private (only Admin can create articles) // يعني فقط الأدمن يستطيع إنشاء مقالات جديدة
*/

export async function POST(request: NextRequest) {
    try {

        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: 'only admin can create articles, access denied' }, { status: 401 }); // unauthorized
        }
        
        const body = (await request.json()) as CreateArticleDto;

        // typeof body.title !== 'string' هذا السطر لتشييك على التايب ممكن نضيفه داخل الإف بإضافة أور
        // if(body.body === "" || body.title === "") {
        //     return NextResponse.json({message: "title and body is required"}, { status: 400}) //400 تعني باد ركويست طلب سيئ يعني المشكلة من العميل في حالة الأربع مئه
        // } بدل ما نستخدم البيور فاليديشن
        //  سوف نستخدم مكتبه تبع نود جي اس وهي زود ورابطها هو zod.dev

        const validation = createArticleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        });

        return NextResponse.json(newArticle, { status: 201 });
    }
    catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}