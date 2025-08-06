import { useTranslations } from "next-intl";
import { TiTick } from "react-icons/ti";

export default function WebHostingPlan() {


    const t = useTranslations('WebHostingPlan');

  return (
    <div className="flex flex-col justify-center items-center p-5 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer">
        <h3 className="text-2xl font-bold mb-4 text-purple-900">
            {t('planTitle')}
        </h3>
        <strong className="text-3xl font-semibold mb-4 text-gray-900">
            {t('planPrice')}
        </strong>
        <span className="text-sm text-red-900 mb-4">
            {t('planDiscount')}
        </span>
        <div className="text-lg mb-4">
            <h5 className="text-lg md:text-2xl font-bold mb-2 text-purple-900">
                {t('planFeatures.title')}
            </h5>
            <div className="flex items-center mb-1 text-green-700">
                <TiTick /> {t('planFeatures.feature1')}
            </div>
            <div className="flex items-center mb-1 text-green-700">
                <TiTick /> {t('planFeatures.feature2')}
            </div>
            <div className="flex items-center mb-1 text-green-700">
                <TiTick /> {t('planFeatures.feature3')}
            </div>
            <div className="flex items-center mb-1 text-green-700">
                <TiTick /> {t('planFeatures.feature4')}
            </div>
            <div className="flex items-center mb-1 text-green-700">
                <TiTick /> {t('planFeatures.feature5')}
            </div>
            <div className="flex items-center mb-1 text-green-700">
                <TiTick /> {t('planFeatures.feature6')}
            </div>
        </div>
        <button className="w-full bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300">
            {t('planButton')}
        </button>
    </div>
  )
}
