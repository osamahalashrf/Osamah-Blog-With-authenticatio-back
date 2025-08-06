import { useTranslations } from "next-intl";

export default function Footer() {

  const t = useTranslations('Footer');

  return (
    <div>
        <div className="text-center bg-gray-700 text-white p-4 h-12">
            {t('footerText')} 
        </div>
    </div>
  )
}
