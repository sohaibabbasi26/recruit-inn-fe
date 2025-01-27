import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async  function middleware(request) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Secret for verifying JWT
  const token = request.cookies.get("token");

  console.log("Token Found", token)

  if (token) {
    try {
      // Verify and decode the JWT
      const { payload } = await jwtVerify(token, secret);
      console.log("Decoded JWT Payload:", payload);

      const userRole = payload.role; // Assuming the role is in the 'role' field

      // Restrict access based on role
      const pathname = request.nextUrl.pathname;

      if (pathname.startsWith("/admin") && userRole !== "admin") {
        console.log("Access denied. Admin role is required.");
        return NextResponse.redirect(new URL("/admin-login", request.url)); // Redirect to unauthorized page
      }

      if (pathname.startsWith("/client") && userRole !== "client") {
        console.log("Access denied. Client role is required.");
        return NextResponse.redirect(new URL("/client-login", request.url)); // Redirect to unauthorized page
      }

      if (pathname.startsWith("/candidate") && userRole !== "candidate") {
        console.log("Access denied. Candidate role is required.");
        return NextResponse.redirect(new URL("/client-self", request.url)); // Redirect to unauthorized page
      }
    } catch (error) {
      console.error("Invalid JWT:", error.message);
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if token verification fails
    }
  } else {
    console.log("No JWT found in cookies.");
    return NextResponse.redirect(new URL("/client-login", request.url)); // Redirect to login if no JWT
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/admin-dashboard", "/candidate/:path*"],
};
