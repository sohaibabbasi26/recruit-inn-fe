import { NextResponse } from "next/server";
import { validateAndDecodeToken } from "./util/validateAndDecodeToken";

export async function middleware(request) {
  const loginToken = request.cookies.get("loginToken")?.value || null;
  const { anyNameForData: user, error: userError } =
    await validateAndDecodeToken(loginToken);

  const url = request.nextUrl;
  const pathname = url.pathname;

  const rolePaths = {
    client: "/client",
    candidate: "/candidate",
    admin: "/admin-dashboard",
  };

  const loginPages = {
    client: "/client-login",
    candidate: "/candidate-login",
    admin: "/admin-login",
  };

  // Redirect to login if token is missing or invalid
  if (!loginToken || userError) {
    if (pathname.startsWith(rolePaths.client)) {
      if (!pathname.startsWith(loginPages.client)) {
        return NextResponse.redirect(new URL(loginPages.client, request.url));
      }
    } else if (pathname.startsWith(rolePaths.candidate)) {
      if (!pathname.startsWith(loginPages.candidate)) {
        return NextResponse.redirect(
          new URL(loginPages.candidate, request.url)
        );
      }
    } else if (pathname.startsWith(rolePaths.admin)) {
      if (!pathname.startsWith(loginPages.admin)) {
        return NextResponse.redirect(new URL(loginPages.admin, request.url));
      }
    }
    return NextResponse.next();
  }

  // Validate user role and redirect accordingly
  if (user) {
    const currentUserId = user.id;
    const userRole = user.role;

    const isClientRoute = pathname.startsWith(rolePaths.client);
    const isCandidateRoute = pathname.startsWith(rolePaths.candidate);
    const isAdminRoute = pathname.startsWith(rolePaths.admin);

    const redirectTo = (path) =>
      pathname === path
        ? null
        : NextResponse.redirect(new URL(path, request.url));

    if (isClientRoute && userRole !== "client") {
      return redirectTo(loginPages.client);
    }
    if (isCandidateRoute && userRole !== "candidate") {
      return redirectTo(loginPages.candidate);
    }
    if (isAdminRoute && userRole !== "admin") {
      return redirectTo(loginPages.admin);
    }

    // Prevent imposters
    const visitedId = pathname.split("/").at(2);
    const isImposter = currentUserId !== visitedId;

    if (isClientRoute && isImposter) {
      return redirectTo(`${rolePaths.client}/${currentUserId}`);
    }
    if (isCandidateRoute && isImposter) {
      return redirectTo(`${rolePaths.candidate}/${currentUserId}`);
    }

    // Loggedin users
    if (pathname === loginPages.client && userRole === "client") {
      return redirectTo(`${rolePaths.client}/${currentUserId}`);
    }
    if (pathname === loginPages.candidate && userRole === "candidate") {
      return redirectTo(`${rolePaths.candidate}/${currentUserId}`);
    }
    if (pathname === loginPages.admin && userRole === "admin") {
      return redirectTo(rolePaths.admin);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/client/:path*",
    "/client-login",
    // "/candidate/:path*",
    // "/candidate-login",
    "/admin-dashboard/:path*",
    "/admin-login",
  ],
};
