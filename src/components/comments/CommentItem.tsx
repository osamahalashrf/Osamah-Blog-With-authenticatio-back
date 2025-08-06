"use client";

import { CommentWithUser } from "@/Utils/types";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import UpdateCommentModle from "./UpdateCommentModle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/Utils/constants";
import { solvTypeEnyInCatch } from "@/Utils/solvTypeEnyInCatch";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

export default function CommentItem({ comment, userId }: CommentItemProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commentDeleteHandler = async () => {
    try {
      if(confirm("you want delete this comment, Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
      }
    } catch (error: unknown) {
      toast.error(solvTypeEnyInCatch(error));
      console.error(error);
    }
    
    // catch (error: any) {
    //   toast.error(error?.response?.data.message);
    //   console.log(error);
    // }
  };

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-7">
        <strong className=" text-gray-800 uppercase text-sm md:text-2xl">
          {comment.user.username}
        </strong>
        <span className=" bg-yellow-700 p-2 rounded-lg text-white text-sm md:text-lg ltr:ml-2 rtl:mr-2">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className=" text-gray-800 mb-2 text-sm md:text-2xl">
          {comment.text}
        </p>
        {userId && userId === comment.userId && (
          <div className="flex justify-end items-center">
            <FaEdit
              onClick={() => setOpen(true)}
              className=" text-green-600 md:text-xl text-base cursor-pointer ltr:mr-4 rtl:me-4"
            />
            <FaTrash onClick={commentDeleteHandler} className="text-red-600 text-sm md:text-xl cursor-pointer" />
          </div>
        )}
      </div>
      {open && (
        <UpdateCommentModle
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
}
