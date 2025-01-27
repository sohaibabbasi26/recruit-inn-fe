import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { validateAndDecodeToken } from "./util/validateAndDecodeToken";

// export async function middleware(request) {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Secret for verifying JWT
//   const loginToken = request.cookies.get("loginToken");
//   console.log("Login Token", loginToken);
//   const token = request.cookies.get("token");

//   console.log("Token Found", token);

//   if (token) {
//     try {
//       // Verify and decode the JWT
//       const { payload } = await jwtVerify(token, secret);
//       console.log("Decoded JWT Payload:", payload);

//       const userRole = payload.role; // Assuming the role is in the 'role' field

//       // Restrict access based on role
//       const pathname = request.nextUrl.pathname;

//       if (pathname.startsWith("/admin") && userRole !== "admin") {
//         console.log("Access denied. Admin role is required.");
//         return NextResponse.redirect(new URL("/admin-login", request.url)); // Redirect to unauthorized page
//       }

//       if (pathname.startsWith("/client") && userRole !== "client") {
//         console.log("Access denied. Client role is required.");
//         return NextResponse.redirect(new URL("/client-login", request.url)); // Redirect to unauthorized page
//       }

//       if (pathname.startsWith("/candidate") && userRole !== "candidate") {
//         console.log("Access denied. Candidate role is required.");
//         return NextResponse.redirect(new URL("/client-self", request.url)); // Redirect to unauthorized page
//       }
//     } catch (error) {
//       console.error("Invalid JWT:", error.message);
//       return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if token verification fails
//     }
//   } else {
//     console.log("No JWT found in cookies.");
//     return NextResponse.redirect(new URL("/client-login", request.url)); // Redirect to login if no JWT
//   }

//   return NextResponse.next();
// }

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const loginToken = request.cookies.get("loginToken")?.value || null;
  console.log("loginToken", loginToken);

  const { anyNameForData: user, error: userError } =
    await validateAndDecodeToken(loginToken);

  console.log("user", user);
  console.log("userError", userError);

  console.log("logged in user", user);

  const url = request?.nextUrl;
  const pathname = url?.pathname;
  const isAuthenticated = user?.id;
  const onClientLoginPage = pathname === "/client-login";
  const onClientSignupPage = pathname === "/client-signup";
  const candidateLoginPage = "/candidate-login";
  const candidateSignupPage = "/candidate-self";

  // Logged in client?
  if (isAuthenticated && (onClientLoginPage || onClientSignupPage)) {
    const redirectPath = `/client/${user.id}`;
    console.log("Redirecting the user to:", redirectPath);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
}

export const config = {
  matcher: [
    "/client/:path*",
    "/admin-dashboard",
    "/candidate/:path*",
    "/client-login",
    "/client-signup",
  ],
};
