import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  // console.log("req.nextUrl", req.nextUrl);

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // NextResponse.json({ message: "dlv" });
      // const loginUrl = new URL("/login", req.url);
      // loginUrl.searchParams.set("from", req.nextUrl.pathname);
      // console.log("loginUrl", loginUrl);
      return NextResponse.redirect(`${req.nextUrl.origin}/login`);
    }
    return NextResponse.next();
  }
}
