import { getSingleArticle } from "@/app/apiCalls/articleApiCall";
import { Article } from "@/generated/prisma";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
    params: { locale: string,
        id: string
     };
   };


export default async function EditArticlePage( { params: { locale , id } }: EditArticlePageProps) {
    const token = cookies().get("jwtToken")?.value || "";
      if (!token) redirect(`/${locale}`);
    
      const userPayload = verifyTokenForPage(token);
      if (userPayload?.isAdmin === false) redirect(`/${locale}`);

      const article:Article = await getSingleArticle(id);
  return (
    <section className={`h-screen flex items-center justify-center px-5 lg:px-20`}>
        <div className={`shadow p-4 bg-purple-400 rounded w-full`}>
            <h2 className={`text-2xl text-green-700 font-semibold mb-4`}>
                Edit Article
            </h2>
            <EditArticleForm article={article} />
        </div>
    </section>
  )
}
