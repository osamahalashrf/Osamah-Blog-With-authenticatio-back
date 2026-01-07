import AddArticleForm from "./AddArticleForm";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

interface AdminPageProps {
  params: Promise<{ locale: string }>; // إضافة Promise هنا
}

export default async function AdminPage({ params }: AdminPageProps) {
  // const locale = useLocale();


  // استخراج params باستخدام await
  const { locale } = await params;

   // الحصول على التوكن من الكوكيز
  // إذا لم يكن هناك توكن، يتم تعيينه كقيمة فارغة
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  if (!token) redirect(`/${locale}`);

  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) redirect(`/${locale}`);

  const t = await getTranslations("AdminDashboard");


  return (
    <div className="flex items-center justify-center h-screen px-5 lg:px-20">
      <div className=" shadow p-4 bg-purple-300 rounded w-full">
        <h2 className=" text-xl lg:text-2xl text-center text-gray-700 font-semibold mb-4">
          {t("ArticlesForm.title")}
        </h2>
        <AddArticleForm />
      </div>
    </div>
  )
}
