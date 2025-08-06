"use client";
import { Article } from "@/generated/prisma";
import Link from "next/link";
import DeleteArticleButton from "./DeleteArticleButton";
import { useTranslations } from "next-intl";

interface AdminArticlesTableProps {
  articles: Article[];
  locale: string;
}

export default function AdminArticlesTable({ articles, locale }: AdminArticlesTableProps) {
    const t = useTranslations("AdminDashboard.ArticlesTable");
  return (
    <table className={`table w-full ltr:text-left rtl:text-right`}>
      <thead className={`border-t-2 border-b-2 lg:text-xl border-gray-500`}>
        <tr>
          <th className={`p-1 lg:p-2`}>{t("thead.id")}</th>
          <th className={`p-1 lg:p-2`}>{t("thead.title")}</th>
          <th className={`p-1 lg:p-2`}>{t("thead.createdAt")}</th>
          <th className={`p-1 lg:p-2`}>{t("thead.actions")}</th>
          <th className={`hidden lg:inline-block`}></th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article, index) => (
          <tr key={index} className={`border-b border-t border-gray-300`}>
            <td className={`p-3 text-gray-700`}>{index + 1}</td>
            <td className={`p-3 text-gray-700`}>{article.title}</td>
            <td className={`p-3 hidden lg:inline-block text-gray-700 font-normal`}>
              {new Date(article.createdAt).toDateString()}
            </td>
            <td className={`p-3`}>
              <Link
                href={`/${locale}/admin/articles-table/edit/${article.id}`}
                className={`bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 ltr:me-2 rtl:me-2 hover:bg-green-800 transition duration-300`}
              >
                {t("tbody.edit")}
              </Link>
              <DeleteArticleButton articleId={article.id} />
            </td>
            <td className={`p-3 hidden lg:inline-block`}>
              <Link
                href={`/${locale}/articles/${article.id}`}
                className={`bg-blue-600 text-white rounded-lg py-1 p-2 text-center mb-2 ltr:me-2 rtl:ms-2 hover:bg-blue-800 transition duration-300`}
              >
                {t("tbody.readMore")}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
