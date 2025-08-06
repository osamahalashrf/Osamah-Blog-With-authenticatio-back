"use client";

import { DOMAIN } from "@/Utils/constants";
import { solvTypeEnyInCatch } from "@/Utils/solvTypeEnyInCatch";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddArticleForm() {
  const router = useRouter();

  const t = useTranslations("AdminDashboard");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Please fill in the title");

    if (description === "")
      return toast.error("Please fill in the description");

    try {
      const response = await fetch(`${DOMAIN}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        // Reset the form fields after successful submission
        setTitle("");
        setDescription("");

        // Show success message and redirect to articles list
        toast.success("Article added successfully");

        router.refresh(); // Refresh the current page to show the new article

        // Redirect to the articles list page
        // router.push("/admin/articles");
      }
    } catch (error: unknown) {
      toast.error(solvTypeEnyInCatch(error || 'An error occurred'));
      console.error("Error adding article:", error);
      //console.error(error);
    }

    // catch (error: any) {
    //   toast.error(error?.response?.data?.message || "");
    //   
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
          placeholder={t("ArticlesForm.placeholdertitle")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          placeholder={t("ArticlesForm.placeholderdescription")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none text-2xl"
          rows={5}
          cols={50}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg py-2 px-3 bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300"
      >
        {t("btn")}
      </button>
    </form>
  );
}
