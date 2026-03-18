    "use client";

import useFetchProducts from "@/app/hooks/useFetchProducts";
import { Skeleton } from "antd";
import Image from "next/image";

const ViewProducts = () => {
  const { loading, error, product } = useFetchProducts();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="max-w-xl w-full" />
        ..
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white  p-6 text-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="h-48 mx-auto object-contain mb-4"
        />

        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        <p className="text-gray-500 text-sm mb-4">{product.description}</p>

        <p className="font-bold text-2xl text-blue-600">NGN {product.price}</p>
      </div>
    </div>
  );
};

export default ViewProducts;
