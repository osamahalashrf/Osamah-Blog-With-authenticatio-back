import { UpdateArticleDto } from "@/Utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";

interface Props {
    params: Promise<{ id: string }>; // إضافة Promise هنا
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/articles/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Get Single Article by id
 * @access public // يعني الكل يوصل له
*/


export async function GET(request: NextRequest, { params }: Props) {
    try {

        // استخراج params باستخدام await
        const { id } = await params;

        console.log(`DEBUG API: Fetching article ID: ${id}`);

        // تحقق من أن ID صالح
        const articleId = parseInt(id);
        if (isNaN(articleId)) {
            console.error(`DEBUG API: Invalid article ID: ${id}`);
            return NextResponse.json({
                message: 'Invalid article ID! ID must be a number.'
            }, { status: 400 });
        }

        const article = await prisma.article.findUnique({
            where: { id: articleId },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true
                            }
                        }
                    }
                }
            }
        });
        if (!article) {
            return NextResponse.json({ message: 'article not found!' }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });

    } catch(error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method PUT
 * @route ~/api/articles/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Update Article by id
 * @access Private (only Admin can update articles) // يعني فقط الأدمن يستطيع تحديث المقالات
*/

export async function PUT(request: NextRequest, { params }: Props) {
    try {

        const { id } = await params;

        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: 'only admin can update articles, access denied' }, { status: 401 }); // unauthorized
        }

        const article = await prisma.article.findUnique({ where: { id: parseInt(id) } });

        if (!article) {
            return NextResponse.json({ message: 'article not found!' }, { status: 404 });
        }

        const body: UpdateArticleDto = await request.json();
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(id) },
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json(updatedArticle, { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}


/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method DELETE
 * @route ~/api/articles/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc DELETE Article by id
 * @access Private (only Admin can delete articles) // يعني فقط الأدمن يستطيع حذف المقالات
*/

export async function DELETE(request: NextRequest, { params }: Props) {

    try {

        const { id } = await params;

        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: 'only admin can delete articles, access denied' }, { status: 401 }); // unauthorized
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(id) },
            include: {
                comments: true // include comments to delete them later
            }
        });
        if (!article) {
            return NextResponse.json({ message: 'article not found!' }, { status: 404 });
        }

        // delete article
        await prisma.article.delete({ where: { id: parseInt(id) } });

        // delete all comments related to this article
        await prisma.comment.deleteMany({ where: { articleId: parseInt(id) } });

        return NextResponse.json({ message: "article deleted" }, { status: 200 });

    } catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}