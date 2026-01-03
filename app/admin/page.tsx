"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useRouter } from "next/navigation";


/* ================= ZOD ================= */

const step1Schema = z.object({
  name: z.string().min(2, "Name required"),
  price: z.number().positive("Price must be > 0"),
  stock: z.number().min(0),
  sales: z.number().min(0),
  category: z.string().min(2, "Category required"),
});

const step2Schema = z.object({
  description: z.string().min(10, "Description too short"),
});

/* ================= TYPES ================= */

type ProductType = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  category: string;
  description: string;
  image: string;
};


export default function AdminPage() {
  //   const router = useRouter();

  // useEffect(() => {
  //   const isAdmin = localStorage.getItem("admin");
  //   if (!isAdmin) {
  //     router.push("/login");
  //   }
  // }, []);

 

  /* ================= STATE ================= */
  const [tab, setTab] = useState<"home" | "products" | "analytics">("home");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔹 multi-step + errors
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<string[]>([]);

  // form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sales, setSales] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  /* ================= LOAD PRODUCTS (FIXED) ================= */
  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  }
    loadProducts();
  }, []);

  /* ================= STEP 1 VALIDATION ================= */
  function handleNextStep() {
    const result = step1Schema.safeParse({
      name,
      price: Number(price),
      stock: Number(stock),
      sales: Number(sales),
      category,
    });

    if (!result.success) {
      setErrors(result.error.issues.map((e) => e.message));
      return;
    }

    setErrors([]);
    setStep(2);
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const step2 = step2Schema.safeParse({ description });

    if (!step2.success) {
      setErrors(step2.error.issues.map((e) => e.message));
      return;
    }

    setLoading(true);

    let imageUrl = "";

    if (image) {
      const fd = new FormData();
      fd.append("file", image);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const url = editingId
      ? `/api/products/${editingId}`
      : "/api/products";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
        sales: Number(sales),
        category,
        description,
        image: imageUrl,
      }),
    });

    // reset
    setName("");
    setPrice("");
    setStock("");
    setSales("");
    setCategory("");
    setDescription("");
    setImage(null);
    setEditingId(null);
    setStep(1);
    setErrors([]);
    setLoading(false);

    loadProducts();
  }


  const categoryColors: Record<string, string> = {
  Electronics: "bg-blue-100 text-blue-700",
  Food: "bg-green-100 text-green-700",
  Furniture: "bg-yellow-100 text-yellow-700",
  Fashion: "bg-pink-100 text-pink-700",
  Books: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-700",
};

  /* ================= DELETE ================= */
  async function deleteProduct(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  /* ================= ANALYTICS ================= */

  const stockChart = products.map((p) => ({
    name: p.name,
    value: p.stock,
  }));

  const salesChart = products.map((p) => ({
    name: p.name,
    value: p.sales,
  }));

  const priceChart = [
    { range: "0-1000", count: products.filter((p) => p.price <= 1000).length },
    {
      range: "1000-5000",
      count: products.filter(
        (p) => p.price > 1000 && p.price <= 5000
      ).length,
    },
    { range: "5000+", count: products.filter((p) => p.price > 5000).length },
  ];

  const totalProducts = products.length;
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);

  /* ================= UI (UNCHANGED) ================= */
  return (

    
    <div className="min-h-screen flex bg-gray-100">
      
      <aside className="w-64 bg-white shadow p-6">

        <h2 className="text-2xl font-bold text-indigo-600 mb-8">
          Admin Panel
        </h2>
        

        <nav className="space-y-4">
          <button
            className={`block w-full text-left ${
              tab === "home" ? "text-indigo-600 font-bold" : ""
            }`}
            onClick={() => setTab("home")}
          >
            Home
          </button>

          <button
            className={`block w-full text-left ${
              tab === "products" ? "text-indigo-600 font-bold" : ""
            }`}
            onClick={() => setTab("products")}
          >
            Products
          </button>

          <button
            className={`block w-full text-left ${
              tab === "analytics" ? "text-indigo-600 font-bold" : ""
            }`}
            onClick={() => setTab("analytics")}
          >
            Analytics
          </button>

<button
  onClick={() => {
    document.cookie = "admin=; Max-Age=0; path=/";
    window.location.href = "/login";
  }}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Logout
</button>
 </nav>
      </aside>

      <main className="flex-1 p-8">
        {tab === "home" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <p>Total Products</p>
              <h2 className="text-4xl font-bold">{totalProducts}</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p>Total Stock</p>
              <h2 className="text-4xl font-bold">{totalStock}</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p>Total Sales</p>
              <h2 className="text-4xl font-bold">{totalSales}</h2>
            </div>
          </div>
        )}

        {tab === "products" && (
          <>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow grid md:grid-cols-3 gap-4 mb-10"
            >
              {errors.length > 0 && (
                <div className="md:col-span-3 bg-red-100 text-red-700 p-3 rounded">
                  {errors.map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              )}

              {step === 1 && (
                <>
                  <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                  <input type="number" placeholder="Sales" value={sales} onChange={(e) => setSales(e.target.value)} />
                  {/* <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
                  <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border rounded px-2 py-2"
>
  <option value="">Select Category</option>
  <option value="Electronics">Electronics</option>
  <option value="Food">Food</option>
  <option value="Furniture">Furniture</option>
  <option value="Fashion">Fashion</option>
  <option value="Books">Books</option>
  <option value="Other">Other</option>
</select>


                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-indigo-600 text-white rounded py-2 md:col-span-3"
                  >
                    Next →
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="md:col-span-3"
                  />
                  <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

                  <div className="md:col-span-3 flex gap-3">
                    <button type="button" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                    <button disabled={loading}>
                      {editingId ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </>
              )}
            </form>



            {/* PRODUCTS LIST */}
<div className="grid md:grid-cols-3 gap-6">
  {products.map((p) => (
    <div key={p._id} className="bg-white p-4 rounded-xl shadow">
      <img
        src={p.image}
        className="h-40 w-full object-cover rounded mb-2"
      />


<span
  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-1 ${categoryColors[p.category] || "bg-gray-100 text-gray-700"}`}
>
  {p.category}
</span>

      <h3 className="font-bold">{p.name}</h3>
      <p>₹ {p.price}</p>
      <p className="text-sm text-gray-600">
        Stock: {p.stock} | Sales: {p.sales}
      </p>
<p className="text-sm text-gray-500 mt-2 line-clamp-3">
  {p.description}
</p>
      <div className="flex gap-2 mt-3">
        {/* UPDATE */}
        <button
          className="flex-1 bg-yellow-500 text-white rounded py-1"
          onClick={() => {
            setEditingId(p._id);
            setName(p.name);
            setPrice(String(p.price));
            setStock(String(p.stock));
            setSales(String(p.sales));
            setCategory(p.category);
            setDescription(p.description);
            setStep(1); // go back to step 1 for edit
          }}
        >
          Update
        </button>

        {/* DELETE */}
        <button
          className="flex-1 bg-red-500 text-white rounded py-1"
          onClick={() => deleteProduct(p._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

          </>
        )}


        

        {tab === "analytics" && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow h-64">
                <h2>stock chart</h2>
                <ResponsiveContainer>
                  <BarChart data={stockChart}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow h-64">
                <h2>sales chart</h2>
                <ResponsiveContainer>
                  <BarChart data={salesChart}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow h-64">
                <h1>price chart</h1>
              <ResponsiveContainer>
                <BarChart data={priceChart}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

