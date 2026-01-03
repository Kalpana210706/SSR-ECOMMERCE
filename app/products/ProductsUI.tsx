
"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

/* ================= TYPES ================= */

type ProductType = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  description: string;
};

/* ================= FETCHER ================= */

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

/* ================= COMPONENT ================= */

export default function ProductsUI() {
  const { data: products, error, isLoading } = useSWR<ProductType[]>(
    "/api/products",
    fetcher
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  if (isLoading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading products...
      </p>
    );
  }

  if (error || !Array.isArray(products)) {
    return (
      <p className="text-center mt-20 text-red-500">
        Failed to load products
      </p>
    );
  }

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold">Our Products</h1>
        <p className="text-gray-500 mt-1">
          Browse our latest collection
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 mb-10">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-48 bg-gray-100">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <span className="text-xs font-semibold text-indigo-600">
                {p.category}
              </span>

              <h3 className="font-bold text-lg mt-1">
                {p.name}
              </h3>

              <p className="text-indigo-600 font-bold mt-2">
                ₹ {p.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {p.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                {p.description}
              </p>

              <Link
                href={`/products/${p._id}`}
                className="mt-4 block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No matching products found
        </p>
      )}
    </main>
  );
}
