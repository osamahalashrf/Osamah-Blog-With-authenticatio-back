import { getSingleArticle } from "@/app/apiCalls/articleApiCall";
import { Article } from "@/generated/prisma";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
  params: Promise<{ locale: string, id: string }>; // إضافة Promise
}


export default async function EditArticlePage({ params }: EditArticlePageProps) {

  try {

    // استخراج params باستخدام await
    const { locale, id } = await params;

    console.log(`DEBUG EditArticlePage: Received params - id: ${id}, locale: ${locale}`);

    // تحقق من أن id صالح
    if (!id || isNaN(parseInt(id))) {
      console.error(`DEBUG: Invalid article ID: ${id}`);
      redirect(`/${locale}/admin/articles-table`);
    }


    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    if (!token) redirect(`/${locale}`);

    const userPayload = verifyTokenForPage(token);
    if (userPayload?.isAdmin === false) redirect(`/${locale}`);

    const article: Article = await getSingleArticle(id);

    return (
      <section className={`h-screen flex items-center justify-center px-5 lg:px-20`}>
        <div className={`shadow p-4 bg-purple-400 rounded w-full`}>
          <h2 className={`text-2xl text-green-700 font-semibold mb-4`}>
            Edit Article
          </h2>
          <EditArticleForm article={article} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error in EditArticlePage:", error);
    redirect(`/${(await params).locale}/admin/articles-table`);
  }
}
