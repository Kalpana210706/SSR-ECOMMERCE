
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@ex.com" && password === "admin@123!!") {
    const res = NextResponse.json({ success: true });

    
    res.headers.append(
      "Set-Cookie",
      "admin=true; Path=/; HttpOnly; SameSite=Lax"
    );

    return res;
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}

