interface ProductsPageProps {
  params?: {
    products: string[];
  };
}
export default function ProductPage({ params }: ProductsPageProps) {
  return (
    <div className="text-xl h-screen container mx-auto">
      ProductsPage
      <ul className="text-xl h-screen container mx-auto">
        {params?.products?.map((route, index) => (
          <li
            key={index}
            className="text-xl text-gray-900 font-bold text-center p-5 rounded mt-3"
          >
            {route}
          </li>
        ))}
      </ul>
    </div>
  );
}
