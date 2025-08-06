import { getSingleArticle } from "@/app/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/Utils/types";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

interface SingleArticlePageProps {
  params: { id: string };
}

export default async function SingleArticlePage({ params}: SingleArticlePageProps) {
  const t = await getTranslations("ArticlesPage.singleArticlePage");

  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  // const response = await fetch(
  //   `http://127.0.0.1:8000/api/articles/${params.id}`,
  //   {
  //     headers: {
  //       "Accept-Language": locale,
  //     },
  //   }
  // );
  // const json = await response.json();
  // const article: Article = json.data;
  //api from laravel with change the language

  


  const article: SingleArticle = await getSingleArticle(params.id);
  

  return (
    <div className=" text-xl text-gray-800 font-bold text-center p-5 rounded mt-3">
      <h1 className="text-3xl font-bold text-blue-700 line-clamp-1 mb-5">
        {t("title")}
      </h1>
      <div className="flex flex-col justify-between bg-white shadow-md rounded-lg p-5 m-2">
        <div>
          <h2 className="text-3xl font-bold text-pink-600 line-clamp-1">
            {article.title}
          </h2>
          <div className="text-gray-400">
            {new Date(article.createdAt).toDateString()}
          </div>
          <p>{article.description}</p>
        </div>
      </div>
      <div className={`mt-7`}>
        {payload ? (
                <AddCommentForm articleId={article.id} />
        ) : (
          <p className={`text-blue-600 md:text-xl`}>
            to write a comment you should log in first!
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        {t("commentTitle")}
      </h4>
      {
        article.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
        ))
      }
      
    </div>
  );
}

// السبب الذي يجعلنا نعرف هذا الفانكشن هنا لأننا سنستخدم الهوك يوز ترانزليشنز (useTranslations) في هذا الفانكشن، والذي لا يمكن تعريفه داخل الفنكشن الئيسيه للكمبوننت لانه إيسينك فنكشن وهي لا تقبل  الهوك.
// لذلك نقوم بتعريفه في فانكشن فرعي داخل الكمبوننت الئيسيه.
