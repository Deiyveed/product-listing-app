"use client";

import { Card, Drawer, message, Skeleton } from "antd";
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

  // add to cart, remove from cart and total cart items
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const total = useCartStore((state) => state.getTotalPrice());

  // loading state for button
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // show items added to cart when cart is clicked

  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

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

        <button className="relative mx-4 mt-3 lg:mt-0" onClick={showDrawer}>
          <ShoppingCartOutlined className="text-5xl cursor-pointer" />

          {totalItems > 0 && (
            <span className="absolute lg:-top-2 lg:-right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
        <Drawer
          title="Your Cart 🛒"
          placement="right"
          onClose={closeDrawer}
          open={open}
          size={450}
        >
          {totalItems === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3 mb-4 pb-4 items-center border-b border-gray-200 "
              >
                <div className="flex justify-between items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={30}
                    height={30}
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    {/* price per item */}
                    <p className="text-sm text-gray-500">
                      ₦{item.price} x {item.quantity}
                    </p>

                    {/* total for this item */}
                    <p className="font-bold">
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="px-2 bg-gray-200 rounded cursor-pointer"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increment(item.id)}
                        className="px-2 bg-gray-200 rounded cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="mt-4 relative bottom-0 pt-4 font-bold text-xl">
            Total:{" "}
            <span className="text-green-500">₦{total.toFixed(2)}</span>
          </div>
        </Drawer>
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
                    <p className="text-2xl font-bold">
                      ₦{product.price.toLocaleString()}
                    </p>
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
