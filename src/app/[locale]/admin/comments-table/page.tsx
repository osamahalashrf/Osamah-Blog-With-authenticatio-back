
import { getAllComments } from "@/app/apiCalls/adminApiCall";
import { Comment } from "@/generated/prisma";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteCommentButton from "./DeleteCommentButton";

interface AdminArticlesTablePageProps {
  params: { locale: string };
  
}
export default async function AdminCommentsTable({
  params: { locale },
}: AdminArticlesTablePageProps) {

   // الحصول على التوكن من الكوكيز
  // إذا لم يكن هناك توكن، يتم تعيينه كقيمة فارغة
  const token = cookies().get("jwtToken")?.value || "";
  if (!token) redirect(`/${locale}`);

 // إذا لم يكن المستخدم مسجلاً كمسؤول، إعادة التوجيه إلى الصفحة الرئيسية
  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) redirect(`/${locale}`);

  
  const comments:Comment[] = await getAllComments(token); // هنا يمكنك استدعاء API لجلب التعليقات

  return (
    <section className={`p-2`}>
        <h1 className={`mb-7 text-2xl font-semibold text-gray-700`}>Comments</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 md:text-lg font-medium text-gray-800 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 md:text-lg font-medium text-gray-800 uppercase tracking-wider">Comment</th>
                        <th className="px-6 py-3 md:text-lg font-medium text-gray-800 uppercase tracking-wider">Created At</th>
                        <th className="px-6 py-3 md:text-lg font-medium text-gray-800 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {comments.map((comment, index) => (
                        <tr key={index} className={`border-b border-t border-gray-300`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm md:text-lg text-center text-gray-900">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm md:text-lg text-center text-gray-900">{comment.text}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm md:text-lg text-center text-gray-900">
                                {new Date(comment.createdAt).toDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm md:text-lg text-center font-medium">
                                {/* هنا يمكنك إضافة أزرار التعديل والحذف */}
                                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                <DeleteCommentButton commentId={comment.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {comments.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
                No comments found.
            </div>
        )}
    </section>
    )
}