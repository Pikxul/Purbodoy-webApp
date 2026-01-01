// proxy.ts (project root)
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  // only run for GET/POST/whatever, Next handles that part for us
  // getToken reads the NextAuth JWT cookie (signed with NEXTAUTH_SECRET)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // if you use a custom JWT name, pass `encryption: ...` or `token: { name: '...' }`
  });

  // no token = not authenticated
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    // preserve original url as redirect param if you want:
    url.searchParams.set("redirectTo", req.nextUrl.pathname + req.nextUrl.search);
    return Response.redirect(url);
  }

  // authenticated — allow request to continue
  return;
}

export const config = {
  matcher: ["/cart", "/checkout", "/profile"],
};
