import { Article } from "@/generated/prisma";
import { DOMAIN } from "@/Utils/constants";
import { SingleArticle } from "@/Utils/types";
import { notFound } from "next/navigation";

// Get articles based on pageNumber, perPage, and searchText
export async function getArticles(
    pageNumber: string | undefined
): Promise<Article[]> {
    // إصلاح: تأكد من أن pageNumber دائماً قيمة صالحة
    const page = pageNumber && !isNaN(parseInt(pageNumber)) ? pageNumber : "1";

    const response = await fetch(
        `${DOMAIN}/api/articles?pageNumber=${page}`,
        {
            cache: "no-store"
        }
    );

    if (!response.ok) {
        notFound(); // إرجاع notFound كما كان
    }

    return response.json();
}

// Get article count
export async function getArticleCount(): Promise<number> {
    const response = await fetch(
        `${DOMAIN}/api/articles/count`,
        {
            cache: "no-store"
        });

    if (!response.ok) {
        throw new Error("Failed to fetch article count");
    }

    const { count } = await response.json() as { count: number };

    return count;
}

// Get article based on searchText
export async function getArticlesBySearchText(searchText: string): Promise<Article[]> {
    const response = await fetch(
        `${DOMAIN}/api/articles/search?searchText=${searchText}`);

    if (!response.ok) {
        throw new Error("Failed to fetch articles by search text");
    }

    return response.json();
}

// Get single article by ID
// Get single article by ID - إصلاح هنا
export async function getSingleArticle(articleId: string | number): Promise<SingleArticle> {
    try {
        // تحويل articleId إلى string دائمًا
        const id = String(articleId);
        console.log(`DEBUG: Fetching article with ID: ${id} (type: ${typeof id})`);

        const response = await fetch(
        `${DOMAIN}/api/articles/${id}`,
        {
            cache: "no-store",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }
    );

        console.log(`DEBUG: Response status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`DEBUG: API Error: ${errorText}`);

            if (response.status === 404) {
                throw new Error("Article not found");
            }
            throw new Error(`Failed to fetch single article: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log(`DEBUG: Article data received:`, data);

        return data;
    } catch (error) {
        console.error(`DEBUG: getSingleArticle error:`, error);
        throw error;
    }
}