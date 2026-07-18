import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
