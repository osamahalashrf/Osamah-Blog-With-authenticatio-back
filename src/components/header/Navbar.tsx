"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { useTranslations } from "next-intl";

interface NavbarProps {
  isAdmin: boolean; // Optional prop to indicate if the user is an admin
}

export default function Navbar({isAdmin} : NavbarProps ) {
  const t = useTranslations("Header");
  const [toggle, setToggle] = useState(false);

  const handleLinkClick = () => {
    if (toggle) setToggle(false);
  };

  return (
    <nav className="relative z-50 bg-inherit px-4 py-3 flex items-center justify-between">
      <Link
        href="/"
        className="hidden lg:flex items-center text-2xl font-bold text-pink-700 hover:text-pink-500 transition duration-300"
      >
        {t('logoPart1')}
        <GrTechnology className="mx-1" />
        {t('logoPart2')}
      </Link>

      <button
        onClick={() => setToggle(!toggle)}
        className="lg:hidden text-gray-700 hover:text-gray-900 transition duration-300"
        aria-label="Toggle menu"
      >
        {toggle ? (
          <IoClose className="w-9 h-9 text-red-600" />
        ) : (
          <IoMenu className="w-9 h-9" />
        )}
      </button>

      {toggle && (
        <div
          onClick={() => setToggle(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      <div
        className={`${
          toggle
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-8 opacity-0 invisible"
        } fixed top-1 left-0 w-full bg-inherit z-50 transform transition-all duration-500 ease-in-out
          lg:static lg:transform-none lg:translate-y-0 lg:opacity-100 lg:visible lg:flex`}
      >
        <ul className="flex flex-col lg:flex-row items-start lg:items-center px-6 py-4 lg:p-0">
          <li>
            <Link
              href="/"
              onClick={handleLinkClick}
              className="block py-2 px-4 text-gray-900 hover:text-blue-800 font-bold text-lg transition duration-300"
            >
              {t('home')}
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              onClick={handleLinkClick}
              className="block py-2 px-4 text-gray-900 hover:text-blue-800 font-bold text-lg transition duration-300"
            >
              {t('articles')}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block py-2 px-4 text-gray-900 hover:text-blue-800 font-bold text-lg transition duration-300"
            >
              {t('about')}
            </Link>
          </li>
          { isAdmin && 
          <li>
            <Link
              href="/admin"
              onClick={handleLinkClick}
              className="block py-2 px-4 text-gray-900 hover:text-blue-800 font-bold text-lg transition duration-300"
            >
              {t('admin')}
            </Link>
          </li>
          }
        </ul>
      </div>
    </nav>
  );
}