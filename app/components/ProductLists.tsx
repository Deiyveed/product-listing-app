"use client";

import { Card, message, Skeleton } from "antd";
import SearchButton from "./SearchButton";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useCartStore } from "../store/cartStore";
import useFetchProducts from "../hooks/useFetchProducts";
import Link from "next/link";
import { useState } from "react";

const ProductLists = () => {
  const { handleSearch, loading, error, searchQuery, filteredProducts } =
    useFetchProducts();

  const addToCart = useCartStore((state) => state.addToCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const [loadingId, setLoadingId] = useState<number | null>(null);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!filteredProducts) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No products available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className=" sm:flex sm:justify-between md:flex lg:flex md:justify-between lg:justify-between items-center">
        <SearchButton
          onChange={handleSearch}
          value={searchQuery}
          placeholder="Search Products"
        />

        <div className="relative mx-4 mt-3 lg:mt-0">
          <ShoppingCartOutlined className="text-5xl cursor-pointer" />

          {totalItems > 0 && (
            <span className="absolute lg:-top-2 lg:-right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 gap-6 mt-6 mb-6">
        {" "}
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                style={{
                  width: 340,
                  height: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton
                  style={{ width: "100%", height: 100, marginTop: "4rem" }}
                />
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            ))
          : filteredProducts.map((product) => (
              <div key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <Card
                    className="w-full"
                    hoverable
                    style={{
                      width: 340,
                      height: 350,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "revert",
                    }}
                    cover={
                      <Image
                        alt={product.title}
                        src={product.image}
                        width={100}
                        height={100}
                        style={{
                          height: "100px",
                          objectFit: "contain",
                          marginTop: "4rem",
                        }}
                      />
                    }
                  >
                    <h2 className=" font-medium">
                      {product.title.substring(0, 50)}...
                    </h2>
                    <p className=" text-2xl font-bold">NGN {product.price}</p>
                    <button
                      disabled={loadingId === product.id}
                      className={`py-1 px-3 mt-3 font-semibold rounded-lg text-white 
                       ${
                         loading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-[#39CDCC] hover:bg-white hover:text-[#39CDCC] border cursor-pointer"
                       }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        setLoadingId(product.id);

                        setTimeout(() => {
                          addToCart(product);
                          setLoadingId(null);

                          message.success(
                            `${product.title} successfully added to cart`
                          );
                        }, 500);
                      }}
                    >
                      {loadingId === product.id && (
                        <LoadingOutlined className=" mr-2" spin />
                      )}
                      {loadingId === product.id ? "Adding..." : "ADD TO CART"}
                    </button>
                  </Card>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductLists;
