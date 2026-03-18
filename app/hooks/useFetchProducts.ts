/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const params = useParams();
  const id = params.id as string;
  
  // to fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError("Failed to fetch product, please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // to handle search query
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // to fetch single product
  useEffect(() => {
    if (!id) return;

    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    searchQuery,
    handleSearch,
    filteredProducts,
  };
};

export default useFetchProducts;
