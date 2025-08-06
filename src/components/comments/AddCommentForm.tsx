
"use client";

import { DOMAIN } from "@/Utils/constants";
import { solvTypeEnyInCatch } from "@/Utils/solvTypeEnyInCatch";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

export default function AddCommentForm({ articleId }: AddCommentFormProps) {

  const t = useTranslations("ArticlesPage.singleArticlePage");
  const router = useRouter();
  const [text, setText] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text === "") return toast.error(t("emptyCommentError"));
        try{
          await axios.post(`${DOMAIN}/api/comments`, {text, articleId});
          router.refresh();
          setText("");
        } catch (error: unknown) {
          toast.error(solvTypeEnyInCatch(error));
          console.error(error);
        }
        
        // catch (error:any) {
        //   toast.error(error?.response?.data.message);
        //   console.log(error)
        // }
        // Handle form submission logic here
        console.log("Result: ", text);
    };

  return (
    <form onSubmit={handleSubmit} action="/api/login" method="POST">
      <div className="mx-2 mt-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          id="text"
          name="text"
          placeholder={t("commentPlaceholder")}
          className="shadow border-none rounded-lg w-full py-2 px-3 bg-white text-gray-900 leading-tight focus:outline-none focus:outline-blue-500"
        />
        <div className="flex justify-start">
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-min text-lg transition">
            {t("commentBtn")}
        </button>
        </div>
      </div>
    </form>
  );
}
