import { UpdateArticleDto } from "@/Utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";

interface Props {
    params: { id: string }
}

/** هذا التعليق نسميه دوكومينتيشن لهذا الروت
 * @method GET
 * @route ~/api/articles/:id //(~) هذه العلامة التي بين القوسين نسميها تلدا تدل على الدومين الذي هو حاليا عندنا http://localhost:3000
 * @desc Get Single Article by id
 * @access public // يعني الكل يوصل له
*/


export async function GET(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({
            where: {
                id: parseInt(params.id)
            },
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

    } catch {
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

        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: 'only admin can update articles, access denied' }, { status: 401 }); // unauthorized
        }

        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });

        if (!article) {
            return NextResponse.json({ message: 'article not found!' }, { status: 404 });
        }

        const body: UpdateArticleDto = await request.json();
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
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
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: 'only admin can delete articles, access denied' }, { status: 401 }); // unauthorized
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                comments: true // include comments to delete them later
            }
        });
        if (!article) {
            return NextResponse.json({ message: 'article not found!' }, { status: 404 });
        }

        // delete article
        await prisma.article.delete({ where: { id: parseInt(params.id) } });

        // delete all comments related to this article
        await prisma.comment.deleteMany({ where: { articleId: parseInt(params.id) } });

        return NextResponse.json({ message: "article deleted" }, { status: 200 });

    } catch {
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        )
    }
}