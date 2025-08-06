'use client'

import { DOMAIN } from "@/Utils/constants";
import { solvTypeEnyInCatch } from "@/Utils/solvTypeEnyInCatch";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
  articleId: number;
}

export default function DeleteArticleButton( { articleId }: DeleteArticleButtonProps ) {
    const router = useRouter();
    const deleteArticleHandler = async () => {
        if (confirm("Are you sure you want to delete this article?")) {
            try {
                await fetch(`${DOMAIN}/api/articles/${articleId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                router.refresh();
                toast.success("Article deleted successfully");
            } catch (error: unknown) {
              toast.error(solvTypeEnyInCatch(error || 'An error occurred while deleting the article'));
              console.error( "Error deleting article: ", error);
            }
            
            // catch (error: any) {
            //     toast.error(error?.response?.data?.message || "An error occurred while deleting the article");
            //     console.error("Error deleting article: ", error);
            //     // يمكن إضافة المزيد من المعالجة هنا إذا لزم الأمر
            // }
        }
            }
            const t = useTranslations("AdminDashboard.ArticlesTable");
  return (
    <div onClick={deleteArticleHandler} className="text-white gap-2 bg-red-600 cursor-pointer rounded-lg inline-block p-2 hover:bg-red-700 transition">
        {t("tbody.delete")}
    </div>
  )
}
