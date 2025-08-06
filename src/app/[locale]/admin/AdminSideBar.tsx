import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";


export default function AdminSideBar() {

  const t = useTranslations("AdminDashboard");

  // استخدام مكتبة next-intl للحصول على اللغة النشطة
  // من خلال استخدام hook useLocale
  const locale = useLocale();
  const getLocalizedPath = (path: string) => {
    // تضمين اللغة النشطة في المسار
    return `/${locale}${path}`;
  };

  return (
    <>
      <Link
        href={getLocalizedPath("/admin")}
        className="flex items-center gap-2 p-2 text-white hover:bg-purple-700 rounded-lg text-lg lg:text-2xl font-semibold"
      >
        <CgMenuGridR className="text-2xl me-1" />
        <span className="hidden lg:block">
          {t("AdminSideBar.title")}
        </span>
      </Link>
      <ul className="flex flex-col items-center justify-center lg:items-start gap-2 mt-10">
        <Link
          href={getLocalizedPath("/admin/articles-table?pageNumber=1")} // فائدة الجيت لوكالايز باث هي تضمين اللغة النشطة في المسار
          className="flex items-center gap-2 p-2 text-white hover:bg-purple-700 rounded-lg text-lg lg:text-2xl font-semibold lg:border-b border-gray-300 hover:border-yellow-200 transition"
        >
          <MdOutlineArticle className="me-1" />
          <span className="hidden lg:block">
            {t("AdminSideBar.articles")}
          </span>
        </Link>
        <Link
          href={getLocalizedPath("/admin/comments-table")}
          className="flex items-center gap-2 p-2 text-white hover:bg-purple-700 rounded-lg text-lg lg:text-2xl font-semibold lg:border-b border-gray-300 hover:border-yellow-200 transition"
        >
          <FaRegComment className="me-1" />
          <span className="hidden lg:block">
            {t("AdminSideBar.comments")}
          </span>
        </Link>
      </ul>
    </>
  );
}
