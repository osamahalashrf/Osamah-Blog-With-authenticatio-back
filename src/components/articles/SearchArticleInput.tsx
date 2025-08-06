 "use client";

 import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SearchArticleInput() {
  const t = useTranslations("ArticlesPage");
  const router = useRouter();
  const locale = useLocale()
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const pathname = usePathname();

  const [searchText, setSearchText] = useState('');

  const formSubmitHandler = (e:React.FormEvent) => {
    e.preventDefault();


    console.log({ searchText })
    router.push(`/${locale}/articles/search?searchText=${searchText}`);
  }

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     const params = new URLSearchParams(searchParams.toString());

  //     if (searchText) {
  //       params.set("searchText", searchText);
  //     } else {
  //       params.delete("searchText");
  //     }

  //     params.set("page", "1"); // نرجع لأول صفحة بعد كل بحث

  //     router.push(`${pathname}?${params.toString()}`);
  //   }, 500); // ⏱️ تأخير نصف ثانية بعد الكتابة

  //   return () => clearTimeout(debounce); // لإلغاء السابق في حال المستخدم يكتب بسرعة
  // }, [searchText]);

  return (
    <form onSubmit={formSubmitHandler} className="mx-6 mt-2">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        id="search"
        name="search"
        placeholder={t("searchPlaceholder")}
        className="shadow border-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
      />
    </form>
  );
}
