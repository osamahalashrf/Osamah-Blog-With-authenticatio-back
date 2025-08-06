import Link from "next/link";
import { Article } from "@/generated/prisma";
import { useLocale, useTranslations } from "next-intl";

interface ArticleItemProps {
  article: Article;
}

export default function ArticleItem({ article }: ArticleItemProps) {
  const locale = useLocale();

  const t = useTranslations("ArticlesPage"); // استخدام الترجمة هنا

  return (
    <div
      key={article.id}
      className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 m-2"
    >
      <div>
        <h2 className="text-3xl font-bold text-pink-600 line-clamp-1">
          {article.title}
        </h2>
        <p>{article.description}</p>
      </div>
      <div>
        <Link href={`/${locale}/articles/${article.id}`}>
          <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full">
            {t("btn")}
          </button>
        </Link>
      </div>
    </div>
  );
}
