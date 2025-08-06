'use client'

import Link from "next/link"

interface ErrorPageProps {
  error: Error;
    reset: () => void;
}

export default function ArticleErrorPage({error, reset}: ErrorPageProps) {
  return (
    <div className="flex bg-white flex-col items-center h-screen">
        <div className="font-bold text-xl text-center rounded">
            This is custom error page for articles
        </div>
        <div className="text-2xl text-red-500 font-bold text-center rounded mt-3">
            Something went wrong
        </div>
        <div className="text-2xl text-red-500 font-bold text-center rounded mt-3">
            Error Message: {error.message}
        </div>
        <button onClick={()=> reset() } className="text-xl rounded-full font-bold bg-blue-600 text-white  text-center py-2 px-4 mt-3">
                Try again
        </button>
        <Link href={"/"}>
            <div className=" underline text-2xl text-blue-500 hover:text-blue-700 text-center p-5 mt-5">
                Go back to home
            </div>
        </Link>
    </div>
  )
}
