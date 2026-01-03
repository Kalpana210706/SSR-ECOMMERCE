
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(null, { status: 404 });
    }

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(null, { status: 500 });
  }
}
