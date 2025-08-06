import { useTranslations } from "next-intl";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
  description: "This is the register page",
};

export default function RegisterPage() {

  const t = useTranslations("RegisterPage");

  return (
    <section className="container mx-auto flex flex-col items-center justify-center h-screen">
          <div className="md:w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl md:text-3xl mb-3 font-bold ">
              {t("title")}
            </h1>
            <RegisterForm />
          </div>
        </section>
  )
}
