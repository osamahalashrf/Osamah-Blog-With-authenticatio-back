import { Link } from "@/i18n/navigation";
import Navbar from "./Navbar";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/Utils/verifyToken";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const t = useTranslations("Header");

  const token = cookies().get("jwtToken")?.value || ""; // الحصول على التوكن من الكوكيز
  // إذا لم يكن هناك توكن، يتم تعيينه كقيمة فارغة
  const userPayload = verifyTokenForPage(token);

  return (
    <header className="header h-24 flex items-center justify-between text-gray-900 font-medium bg-gray-300 border-b-2 md:border-b-4 border-solid border-gray-500 py-0 px-4 md:px-10">
      <Navbar isAdmin={userPayload?.isAdmin || false} /> {/* تمرير خاصية isAdmin إلى Navbar */}
      <LanguageSwitcher />
      <div className="right flex gap-3 items-center">
        {userPayload ? (
          <>
          <strong className="text-blue-800 capitalize text-sm md:text-lg">
            {userPayload?.username}
          </strong>
          <LogoutButton />
          </>
        ) : (
          <>
            <Link
              className="btn text-sm md:text-lg bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
              href="/login"
            >
              {t("login")}
            </Link>
            <Link
              className="btn text-sm md:text-lg bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
              href="/register"
            >
              {t("register")}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
