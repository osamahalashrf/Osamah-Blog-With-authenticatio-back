import { getArticles } from "@/app/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/Utils/constants";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Pagination from "@/components/articles/Pagination";
import AdminArticlesTable from "./AdminArticlesTable";
import { prisma } from "@/Utils/db";

interface AdminArticlesTablePageProps {
  searchParams: { pageNumber: string };
  params: { locale: string };
  
}

export default async function AdminArticlesPage({
  searchParams: { pageNumber },
  params: { locale },
}: AdminArticlesTablePageProps) {
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) redirect(`/${locale}`);

  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) redirect(`/${locale}`);

  const articles = await getArticles(pageNumber);
  //const count = await getArticleCount();
  const count = await prisma.article.count(); // الحصول على عدد المقالات من API
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      {articles.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No articles found.
        </div>
      )}
      <AdminArticlesTable articles={articles} locale={locale} />
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route={`/${locale}/admin/articles-table`}
      />
    </section>
  );
}
