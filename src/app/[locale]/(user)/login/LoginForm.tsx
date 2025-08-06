"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ButtonSpinner from "@/components/ButtonSpinner";

export default function LoginForm() {
  const router = useRouter() // لا يمكن استخدامه الا في الكلاينت كمبوننت فقط عندما نستخدم يوز كلاينت في الاعلى
  const locale = useLocale(); // الحصول على اللغة النشطة

  const t = useTranslations("LoginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "" || password === "" || !email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password.length > 20) {
            toast.error("Password must be less than 20 characters long.");
            return;
        }
        if (!/[0-9]/.test(password)) {
            toast.error("Password must contain at least one number.");
            return;
        }

        try {
            setLoading(true);
            // Send login request to the server
            const response = await axios.post(`http://localhost:3000/api/users/login`, { email, password });
            if (response.status === 200) {
               router.replace(`/${locale}/`);
               setLoading(false);
                //toast.success("Login successful!");
                router.refresh(); // Refresh the page to reflect the login state
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle specific error from the server
                if (error.response) {
                    toast.error(error.response.data.message || "Login failed. Please try again.");
                    console.log(e)
                } else {
                    toast.error("An error occurred while logging in. Please try again.");
                }
            } else {
                // Handle unexpected errors
                toast.error("An unexpected error occurred. Please try again.");
            }
            setLoading(false);
        }

        //router.replace(`/${locale}/`); لا يرجعك لصفحه السابقه لو ضغطت على زر سهم الرجوع في المتصفح اي يحذف المسار السابق من الهيستوري
        // router.push('/'); نفس عمل الريبليس بالضبط غير انه يرجعك لصفحة الستابقة لما ترجع للخلف من زر المتصفح
    // ولكل منهما استخدامه المناسب فإن اردت المستخدم ان يستطيع لرجوع
    //الى الصفحه السابقه تستخدم (بوش) وإذا لم ترد ذلك تستخدم الريبليس
    // ففي مثالنا هذا لأغراض الامان فالافضل الا يستطيع الرجوع الى اللوجين بيج
    //فاستخدمنا الريبليس ، لكن مثلا في الصفحات الداخليه مثل التنقل في صفحات 
    //الادمين فهنا الذي يظهر الافضل الوش لكي لا يحذف مسار الصفحه السابقة
    //لكي لو عمل المستخدم رجوع من زر المتصفح يعيده طبيعي
      };

  return (
    <form onSubmit={handleSubmit} action="/api/login" method="POST">
      <div className="mb-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder={t("loginForm.email.placeholder")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder={t("loginForm.password.placeholder")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg py-2 px-3 bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* {t("loginForm.btn")} */}
        {loading ? <ButtonSpinner /> : t("loginForm.btn")}
      </button>
    </form>
  );
}
