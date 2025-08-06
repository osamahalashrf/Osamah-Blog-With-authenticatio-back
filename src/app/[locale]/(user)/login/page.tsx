import { useTranslations } from "next-intl";
import LoginForm from "./LoginForm";
import { Metadata } from "next";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login Page",
  description: "This is the login page",
};

export default function LoginPage() {

  // أستغنينا عن الكود الذي في الأسفل لأننا عملنا التحقق في الميدل وير واستخدمناه لصفحتي اللوجين والريجستر
  
  
  // {const token = cookies().get('jwtToken')?.value;

  // // If the user is already logged in, redirect them to the home page
  // if (token) redirect("/") // إذا تحقق الشرط ، يتم إعادة توجيه المستخدم
  //                         //  إلى الصفحة الرئيسية ولا يتم تنفيذ الكود الذي في الأسفل.} 

  const t = useTranslations("LoginPage");

  return (
    <section className="container mx-auto flex flex-col items-center justify-center h-screen">
      <div className="md:w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl md:text-3xl mb-3 font-bold ">
          {t("title")}
        </h1>
        <LoginForm />
      </div>
    </section>
  );
}
