import Image from "next/image";
import CloudImage from "../../../public/cloud-hosting.png";
import { TiTick } from "react-icons/ti";
import { useTranslations } from "next-intl";


export default function Hero() {

  const t = useTranslations("Hero");

  return (
    <div className="h-calc(100vh-100px) flex flex-col md:flex-row justify-center md:justify-around items-center px-4 md:px-8 py-0 bg-gray-100">
      <div className="flex flex-col justify-center items-start p-5">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("herotitle")}
        </h1>
        <p className="text-lg mb-4">
          {t("heroDescription")}
        </p>
        <div className="text-lg mb-4">
          <div className="flex items-center mb-4">
            <TiTick /> {t("herofeature1")}
          </div>
          <div className="flex items-center mb-4">
            <TiTick /> {t("herofeature2")}
          </div>
          <div className="flex items-center mb-4">
            <TiTick /> {t("herofeature3")}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-5">
        {/* Image component from Next.js for optimized image loading */}
        <Image src={CloudImage} alt="cloud" width={500} height={500} />
      </div>
    </div>
  );
}
