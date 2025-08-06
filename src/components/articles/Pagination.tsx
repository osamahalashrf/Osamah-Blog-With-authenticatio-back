import { useTranslations } from "next-intl";
import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {
  const t = useTranslations("AdminDashboard.ArticlesTable.pagination");
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className={`flex items-center justify-center mt-2 mb-10`}>
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className={`border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
        >
          {t("prev")}
        </Link>
      )}
      {pagesArray.map((page, key) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          key={key}
          className={`${pageNumber === page ? "bg-gray-200" : ""} border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className={`border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
        >
          {t("next")}
        </Link>
      )}
    </div>
  );
};

export default Pagination;

// الأسفل يخص الباك اند من لارافل

// "use client";

// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useTranslations } from "next-intl";

// type PaginationProps = {
//   currentPage: number;
//   lastPage: number;
//   perPage: number;
//   perPageOptions?: number[];
//   resourceName?: string; // مثل: "articles" أو "users"
// };

// export default function Pagination({
//   currentPage,
//   lastPage,
//   perPage,
//   perPageOptions = [3, 6, 9, 12],
//   resourceName = "", // يمكن استخدامه في الترجمة أو أي غرض آخر
// }: PaginationProps) {
//   const t = useTranslations("ArticlesPage.pagination"); // استخدام الترجمة هنا
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const goToPage = (page: number) => {
//   const params = new URLSearchParams(searchParams);
//   params.set("page", String(page)); // ✅ بدل pageNumber
//   router.push(`${pathname}?${params.toString()}`);
// };

// const changePerPage = (value: string) => {
//   const params = new URLSearchParams(searchParams);
//   params.set("per_page", value); // ✅ بدل per_Page
//   params.set("page", "1"); // نعود لأول صفحة
//   router.push(`${pathname}?${params.toString()}`);
// };

//   const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

//   return (
//     <div className="flex flex-wrap gap-4 justify-between items-center mt-6 border-t pt-4">
//       {/* Select */}
//       <div className="flex items-center gap-2">
//         <label className="font-semibold">{t("show")}</label>
//         <select
//           onChange={(e) => changePerPage(e.target.value)}
//           defaultValue={perPage}
//           className="p-2 border rounded text-black"
//         >
//           {perPageOptions.map((n) => (
//             <option key={n} value={n}>
//               {n}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
//         >
//           {t("prev")}
//         </button>

//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => goToPage(page)}
//             className={`px-4 py-2 border rounded ${
//               currentPage === page ? "bg-gray-800 text-white" : "hover:bg-gray-200"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage === lastPage}
//           className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
//         >
//           {t("next")}
//         </button>
//       </div>
//     </div>
//   );
// }
