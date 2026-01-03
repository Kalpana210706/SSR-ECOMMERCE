// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const isAdmin = request.cookies.get("admin")?.value;

//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     if (!isAdmin) {
//       return NextResponse.redirect(
//         new URL("/login", request.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const isAdmin = request.cookies.get("admin")?.value;

//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     if (!isAdmin) {
//       return NextResponse.redirect(
//         new URL("/login", request.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const adminCookie = req.cookies.get("admin");

  if (!adminCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
