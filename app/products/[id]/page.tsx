
// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "next/navigation";

// // // type Product = {
// // //   _id: string;
// // //   name: string;
// // //   price: number;
// // //   image: string;
// // //   description: string;
// // //   category: string;
// // //   stock: number;
// // // };

// // // export default function ProductPage() {
// // //   const { id } = useParams();
// // //   const [product, setProduct] = useState<Product | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     async function fetchProduct() {
// // //       const res = await fetch(`/api/products/${id}`);

// // //       if (!res.ok) {
// // //         setProduct(null);
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const data = await res.json();
// // //       setProduct(data);
// // //       setLoading(false);
// // //     }

// // //     fetchProduct();
// // //   }, [id]);

// // //   if (loading) {
// // //     return <p className="text-center mt-20">Loading...</p>;
// // //   }

// // //   if (!product) {
// // //     return (
// // //       <p className="text-center mt-20 text-xl font-semibold">
// // //         Product not found
// // //       </p>
// // //     );
// // //   }

// // //   return (
// // //     <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
// // //       {/* IMAGE */}
// // //       <div className="bg-gray-100 rounded-xl p-6">
// // //         <img
// // //           src={product.image}
// // //           alt={product.name}
// // //           className="w-full h-96 object-cover rounded-lg"
// // //         />
// // //       </div>

// // //       {/* DETAILS */}
// // //       <div>
// // //         <span className="inline-block mb-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600">
// // //           {product.category}
// // //         </span>

// // //         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

// // //         <p className="text-2xl font-semibold text-indigo-600 mb-4">
// // //           ₹ {product.price}
// // //         </p>

// // //         <p className="text-gray-600 mb-6">{product.description}</p>

// // //         <p className="mb-6">
// // //           {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
// // //         </p>

      
// // //         <button
// // //   onClick={async () => {
// // //     const res = await fetch(`/api/products/${product._id}/buy`, {
// // //       method: "POST",
// // //     });

// // //     if (res.ok) {
// // //       alert("Order placed successfully!");
// // //       window.location.reload();
// // //     } else {
// // //       alert("Out of stock");
// // //     }
// // //   }}
// // //   className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
// // // >
// // //   Buy Now
// // // </button>

// // //       </div>
// // //     </main>
// // //   );
// // // }

// // import connectDB from "@/lib/mongodb";
// // import Product from "@/models/Product";
// // import Image from "next/image";

// // type PageProps = {
// //   params: {
// //     id: string;
// //   };
// // };

// // export default async function ProductPage({ params }: PageProps) {
// //   await connectDB();

// //   const product = await Product.findById(params.id).lean();

// //   if (!product) {
// //     return <div className="p-10 text-center text-xl">Product not found</div>;
// //   }

// //   return (
// //     <main className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
// //       <div className="bg-gray-100 rounded-xl p-4">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="w-full h-96 object-cover rounded-xl"
// //         />
// //       </div>

// //       <div>
// //         <span className="text-sm text-indigo-600 font-semibold">
// //           {product.category}
// //         </span>

// //         <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

// //         <p className="text-2xl text-indigo-600 font-bold mt-4">
// //           ₹ {product.price}
// //         </p>

// //         <p className="text-gray-600 mt-6">{product.description}</p>

// //         <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">
// //           Buy Now
// //         </button>
// //       </div>
// //     </main>
// //   );
// // }

// import connectDB from "@/lib/mongodb";
// import Product from "@/models/Product";
// import Image from "next/image";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// export default async function ProductDetailPage({ params }: PageProps) {
//   await connectDB();

//   const product = await Product.findById(params.id).lean();

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-2xl">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
//       {/* IMAGE */}
//       <div className="bg-gray-100 rounded-xl p-4">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={500}
//           height={500}
//           className="rounded-xl object-cover"
//         />
//       </div>

//       {/* DETAILS */}
//       <div>
//         <span className="inline-block mb-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
//           {product.category}
//         </span>

//         <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

//         <p className="text-2xl text-indigo-600 font-semibold mt-4">
//           ₹ {product.price}
//         </p>

//         <p className="text-gray-600 mt-6 leading-relaxed">
//           {product.description}
//         </p>

//         <p className="mt-4 text-sm text-gray-500">
//           Stock available: {product.stock}
//         </p>

//         <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// }
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Image from "next/image";
import BuyButton from "./BuyButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params; // 🔥 THIS IS THE FIX

  await connectDB();

  const product = await Product.findById(id).lean();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* IMAGE */}
      <div className="bg-gray-100 rounded-xl p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-xl object-cover"
        />
      </div>

      {/* DETAILS */}
      <div>
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          {product.category}
        </span>

        <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

        <p className="text-2xl text-indigo-600 font-semibold mt-4">
          ₹ {product.price}
        </p>

        <p className="text-gray-600 mt-6 leading-relaxed">
          {product.description}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Stock available: {product.stock}
        </p>

        {/* <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Buy Now
        </button> */}
        <BuyButton productId={product._id.toString()} />
      </div>
    </div>
  );
}
