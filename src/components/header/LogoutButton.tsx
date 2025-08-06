"use client";

import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const t = useTranslations("Header.Logout");
  const router = useRouter();
  const locale = useLocale(); // الحصول على اللغة النشطة

  const handleLogout = async () => {
    try {
      // Send logout request to the server
      const response = await axios.get(
        "http://localhost:3000/api/users/logout"
      );
      if (response.status === 200) {
        // Clear the JWT token from cookies or local storage
        document.cookie =
          "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success(t("success"));
        router.replace(`/${locale}/`); // Redirect to home page after logout
        router.refresh(); // Refresh the page to reflect the logout state
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || t("error"));
      } else {
        toast.error(t("error"));
      }
    }
  };

  return (
    <button
      className="btn text-sm md:text-lg bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
      onClick={handleLogout}
    >
      {t("title")}
    </button>
  );
}
