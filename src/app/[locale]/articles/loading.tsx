const articlesSkeleton = [1, 2, 3, 4, 5, 6];

export default function ArticlesLoading() {
  return (
    <div>
      <section className="h-screen container m-auto px-5 animate-pulse">
        <div className="my-10 w-full mx-auto bg-gray-300 h-12 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {articlesSkeleton.map((item) => (
            <div
              key={item}
              className="flex flex-col justify-between w-full md:w-2/3 bg-gray-200 rounded-lg p-4 m-2"
            >
              <div>
                <h2 className="h-6 bg-gray-300"></h2>
                <p className="my-2 bg-gray-300 p-1 h-10"></p>
              </div>
              <div className="mt-2 bg-gray-400 px-4 py-2 rounded-lg w-full h-8"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="bg-gray-300 w-60 rounded-sm h-9"></div>
        </div>
      </section>
    </div>
  );
}
