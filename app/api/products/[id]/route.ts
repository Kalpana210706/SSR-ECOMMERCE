
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import Product from "@/models/Product";
// import mongoose from "mongoose";

// type RouteContext = {
//   params: {
//     id: string;
//   };
// };
// export async function GET(
//   req: Request,
//   { params }: RouteContext
// ) {
//   try {
//     await connectDB();

//     if (!mongoose.Types.ObjectId.isValid(params.id)) {
//       return NextResponse.json(null, { status: 404 });
//     }

//     const product = await Product.findById(params.id);

//     if (!product) {
//       return NextResponse.json(null, { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (err) {
//     return NextResponse.json(null, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔥 THIS IS THE FIX

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(null, { status: 404 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
