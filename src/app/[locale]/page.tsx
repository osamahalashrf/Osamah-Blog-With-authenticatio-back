import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";
import { useTranslations } from "next-intl";

export default function HomePage() {

  const t = useTranslations('HomePage');

  /*
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  */

  return (
    <div>
      <section>
        <Hero />
        <h2 className="text-2xl md:text-3xl font-bold text-center my-8">
          {t('webHostingPlans')}
        </h2>
        <div className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <WebHostingPlan />
          <WebHostingPlan />
          <WebHostingPlan />
        </div>
      </section>
    </div>
  );
}
