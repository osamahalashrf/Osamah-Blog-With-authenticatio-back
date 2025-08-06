import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "About Page",
  description: "About the application",
};

export default function AboutPage() {

  const t = useTranslations("AboutPage");

  return (
    <section className={"text-xl h-screen container mx-auto"}>
      <h1 className="text-2xl text-gray-900 font-bold text-center p-5 rounded mt-3">
        {t("title")}
      </h1>
      <p className="text-gray-600 text-xl text-center p-5 mt-3">
        {t("description")}
      </p>
    </section>
  );
}
