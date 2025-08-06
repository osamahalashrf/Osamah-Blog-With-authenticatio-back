import { getArticles } from "@/app/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/Utils/constants";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/Utils/db";

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming",
};

interface ArticlePageProps {
  searchParams: { pageNumber: string };
}

// type ApiResponse = {
//   data: Article[];
//   links: {
//     next: string | null;
//     prev: string | null;
//   };
//   meta: {
//     current_page: number;
//     last_page: number;
//   };
// }; تبع لارافل

// type Props = {
//   searchParams: {
//     page?: string;
//     per_page?: string;
//     searchText?: string;
//   };
// }; تبع لارافل

export default async function ArticlesPage({ searchParams }: ArticlePageProps) {
  const t = await getTranslations("ArticlesPage"); // استخدام الترجمة هنا

  const { pageNumber } = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  //const count: number = await getArticleCount(); استغنينا عن هذا السطر لأننا سنستخدم Prisma لجلب عدد المقالات في السطر الذي بعده مباشرةً.من غير وساطة الإي بي آي

  const count: number = await prisma.article.count(); // الحصول على عدد المقالات من API
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  // const page = searchParams.page || "1";
  // const perPage = searchParams.per_page || "6";
  // const searchText = searchParams.searchText || "";
  //const locale = await getLocale(); // الحصول على اللغة الحالية من نكست جي اس (Next.js) ، والتي يمكن استخدامها في الترجمة.
  // const queryParams = new URLSearchParams({
  //   page,
  //   per_page: perPage,
  // });

  // if (searchText) queryParams.set("searchText", searchText); // إذا كان هناك نص بحث، يتم إضافته إلى معلمات الاستعلام (query parameters) للطلب.
  // إذا لم يكن هناك نص بحث، يتم تجاهل هذا الشرط ولن يتم إضافة معلمة البحث إلى الطلب.

  // const response = await fetch(
  //   `http://127.0.0.1:8000/api/articles?${queryParams.toString()}`,
  //   {
  //     //next: { revalidate: 50 }   يتم تحديث البيانات كل 50 ثانية (revalidate) ، مما يعني أنه سيتم جلب البيانات من الخادم مرة واحدة كل 50 ثانية.
  //     // هذا الاختيار مفيد عندما نريد التأكد من أن البيانات التي نحصل عليها هي الأحدث دائمًا. ويتم تحديثها كل خمسين ثانية.

  //     cache: "no-store", //  لا يتم تخزين البيانات في الذاكرة المؤقتة (cache) ، بل يتم جلبها من الخادم في كل مرة يتم فيها استدعاء الصفحة.
  //     // هذا الاختيار مفيد عندما نريد التأكد من أن البيانات التي نحصل عليها هي الأحدث دائمًا.
  //     // في هذه الحالة، يتم جلب البيانات من واجهة برمجة التطبيقات (API) في كل مرة يتم فيها تحميل الصفحة.
  //     // لأن الافتراضي هو "default" يتم تخزين البيانات في الذاكرة المؤقتة (cache) الموجود في نكست جي اس (Next.js) ، مما يعني أنه يتم جلب البيانات مرة واحدة فقط عند تحميل الصفحة لأول مرة.

  //     headers: {
  //       Accept: "application/json",
  //       "Accept-Language": locale,
  //     },
  //   }
  // ); api from laravel with change the language

  return (
    <section className="text-xl bg-green-400 text-gray-800 font-bold text-center p-5 rounded">
      {t("title")}
      <SearchArticleInput />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>

      {/* <SearchArticleInput defaultValue={searchText} /> */}
      {/* {data.length === 0 ? (
        <div className="mt-6 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded p-6 shadow">
          <p className="text-lg">{t("noResults")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.map((article) => (
              <ArticleItem article={article} key={article.id} />
            ))}
          </div>

          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            perPage={+perPage}
          />
        </>
      )} يخص لارافل
      */}

      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages} />
    </section>
  );
}

// السبب الذي يجعلنا نعرف هذا الفانكشن هنا لأننا سنستخدم الهوك يوز ترانزليشنز (useTranslations) في هذا الفانكشن، والذي لا يمكن تعريفه داخل الفنكشن الئيسيه للكمبوننت لانه إيسينك فنكشن وهي لا تقبل  الهوك.
// لذلك نقوم بتعريفه في فانكشن فرعي داخل الكمبوننت الئيسيه.
