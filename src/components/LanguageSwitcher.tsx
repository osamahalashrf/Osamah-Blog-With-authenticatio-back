"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiGlobe } from "react-icons/fi";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    // حفظ اللغة في الكوكيز لمدة سنة
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;

    // استخراج جميع البراميترز الحالية
    const params = new URLSearchParams(searchParams);

    // تعديل المسار ليتضمن اللغة الجديدة
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    // إنشاء رابط كامل مع البراميترز
    const fullUrl = `${newPath}?${params.toString()}`;

    setShowMenu(false);
    router.push(fullUrl);
  };

  return (
    <div
      className="relative inline-block text-left z-50"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        aria-label="Language switcher"
      >
        <FiGlobe className="md:text-2xl" />
      </button>

      {showMenu && (
        <div className="absolute right-0 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg">
          <button
            onClick={() => switchLanguage("ar")}
            className={`block w-full text-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              locale === "ar"
                ? "font-bold text-blue-500"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => switchLanguage("en")}
            className={`block w-full text-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              locale === "en"
                ? "font-bold text-blue-500"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
