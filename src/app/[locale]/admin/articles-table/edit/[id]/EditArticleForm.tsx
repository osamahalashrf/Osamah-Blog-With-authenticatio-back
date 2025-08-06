"use client";

import { Article } from "@/generated/prisma";
import { DOMAIN } from "@/Utils/constants";
import { solvTypeEnyInCatch } from "@/Utils/solvTypeEnyInCatch";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
    article: Article;
}

export default function EditArticleForm( { article }: EditArticleFormProps) {
  const router = useRouter();

  const t = useTranslations("AdminDashboard.ArticlesTable.singleArticlePage");

  const [title, setTitle] = useState(article.title || "");
  const [description, setDescription] = useState(article.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Please fill in the title");

    if (description === "") return toast.error("Please fill in the description");

    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`,{ title, description });
        // Show success message and redirect to articles list
        toast.success("Article updated successfully");
        router.refresh(); // Refresh the current page to show the new article
    } catch (error: unknown) {
      toast.error(solvTypeEnyInCatch(error || 'An error occurred while updating the article'));
      console.error( "Error adding article:", error);
    }
    
    // catch (error: any) {
    //   toast.error(error?.response?.data?.message || "An error occurred");
    //   console.error("Error adding article:", error);
    // }

  };


  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          name="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none text-2xl"
          rows={5}
          cols={50}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg py-2 px-3 bg-green-600 text-white font-semibold hover:bg-green-800 duration-300"
      >
        {t("btn")}
      </button>
    </form>
  );
}
