import { NextResponse } from "next/server";
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

  const { anyNameForData: user, error: userError } =
    await validateAndDecodeToken(loginToken);

  const url = request?.nextUrl;
  const pathname = url?.pathname;

  const rolePaths = {
    client: "/client",
    candidate: "/candidate",
    admin: "/admin-dashboard",
  };

  if (!loginToken || userError) {
    if (pathname.startsWith(rolePaths.client)) {
      return NextResponse.redirect(new URL("/client-login", request.url));
    }
    if (pathname.startsWith(rolePaths.candidate)) {
      return NextResponse.redirect(new URL("/candidate-login", request.url));
    }
    if (pathname.startsWith(rolePaths.admin)) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  if (user) {
    const currentUserId = user?.id;
    const userRole = user?.role;

    const visitedId = pathname.split("/").at(2);

    const isClientRoute = pathname.startsWith(rolePaths.client);
    const isCandidateRoute = pathname.startsWith(rolePaths.candidate);
    const isAdminRoute = pathname.startsWith(rolePaths.admin);

    const isImposter = currentUserId !== visitedId;

    const redirectTo = (path) =>
      NextResponse.redirect(new URL(path, request.url));

    if (isClientRoute) {
      if (userRole !== "client") {
        return redirectTo("/client-login");
      }
      if (pathname === rolePaths.client && currentUserId) {
        return redirectTo(`/client/${currentUserId}`);
      }
      if (isImposter) {
        return redirectTo(`/client/${currentUserId}`);
      }
    }

    if (isCandidateRoute) {
      if (userRole !== "candidate") {
        return redirectTo("/candidate-login");
      }
      if (pathname === rolePaths.candidate && currentUserId) {
        return redirectTo(`/candidate/${currentUserId}`);
      }
      if (isImposter) {
        return redirectTo(`/candidate/${currentUserId}`);
      }
    }

    if (isAdminRoute) {
      if (userRole !== "admin") {
        return redirectTo("/admin-login");
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/client/:path*",
    // "/client-login",
    // "/client-signup",
    // "/candidate/:path*",
    "/admin-dashboard/:path*",
    "/admin-login",
  ],
};
