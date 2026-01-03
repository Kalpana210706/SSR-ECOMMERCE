
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

    
        <BuyButton productId={product._id.toString()} />
      </div>
    </div>
  );
}
