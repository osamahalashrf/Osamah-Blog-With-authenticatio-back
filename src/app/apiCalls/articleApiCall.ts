import { Article } from "@/generated/prisma";
import { DOMAIN } from "@/Utils/constants";
import { SingleArticle } from "@/Utils/types";

// Get articles based on pageNumber, perPage, and searchText
export async function getArticles(
    pageNumber: string | undefined
): Promise<Article[]> {
    const response = await fetch(
        `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
        {
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch articles");
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
export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
    const response = await fetch(
        `${DOMAIN}/api/articles/${articleId}`, {
        cache: "no-store"
    }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch single article");
    }

    return response.json();
}