'use client'
import { DOMAIN } from "@/Utils/constants";
import { solvTypeEnyInCatch } from "@/Utils/solvTypeEnyInCatch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentButtonProps {
    commentId: number
}

export default function DeleteCommentButton( {commentId}: DeleteCommentButtonProps ) {
    const router = useRouter();

    const deleteCommentHandler = async () => {
        if (confirm("Are you sure you want to delete this comment?")) {
            try {
                await fetch(`${DOMAIN}/api/comments/${commentId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                router.refresh();
                toast.success("Comment deleted successfully");
            } catch (error: unknown) {
              toast.error(solvTypeEnyInCatch(error || 'An error occurred while deleting the comment'));
              console.error( "Error deleting comment: ", error);
            }
            
            // catch (error: any) {
            //     toast.error(error?.response?.data?.message || "An error occurred while deleting the comment");
            //     console.error("Error deleting comment: ", error);
            //     // يمكن إضافة المزيد من المعالجة هنا إذا لزم الأمر
            // }
        }
    }
  return (
    <div onClick={ deleteCommentHandler } className="text-white gap-2 bg-red-600 ltr:ml-2 rtl:mr-2 cursor-pointer rounded-lg inline-block p-2 hover:bg-red-700 transition">
        Delete
    </div>
  )
}
