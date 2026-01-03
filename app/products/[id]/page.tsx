
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);

      if (!res.ok) {
        setProduct(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!product) {
    return (
      <p className="text-center mt-20 text-xl font-semibold">
        Product not found
      </p>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="bg-gray-100 rounded-xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* DETAILS */}
      <div>
        <span className="inline-block mb-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600">
          {product.category}
        </span>

        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-2xl font-semibold text-indigo-600 mb-4">
          ₹ {product.price}
        </p>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <p className="mb-6">
          {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

      
        <button
  onClick={async () => {
    const res = await fetch(`/api/products/${product._id}/buy`, {
      method: "POST",
    });

    if (res.ok) {
      alert("Order placed successfully!");
      window.location.reload();
    } else {
      alert("Out of stock");
    }
  }}
  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
>
  Buy Now
</button>

      </div>
    </main>
  );
}
