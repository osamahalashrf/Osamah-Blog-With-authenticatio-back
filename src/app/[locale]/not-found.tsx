
export default function NotFoundPage() {
  return (
    <section>
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
            <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Go Back Home</a>
        </div>
    </section>
  )
}
