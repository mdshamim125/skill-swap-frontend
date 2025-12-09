export type UserRole = "ADMIN" | "MENTOR" | "USER";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

/* ---------------------------------------------
   PUBLIC ROUTES (no authentication required)
---------------------------------------------- */
export const authRoutes = ["/login", "/register"];

/* ---------------------------------------------
   COMMON PROTECTED ROUTES (all logged users)
---------------------------------------------- */
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/dashboard/my-profile", "/dashboard/chat"],
  patterns: [/^\/dashboard\/chat/],
};

/* ---------------------------------------------
   ROLE-BASED PROTECTED ROUTES
---------------------------------------------- */

// ADMIN
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard\/admin/], // Matches adminNavItems
};

// MENTOR
export const mentorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard\/mentor/], // Corrected to match mentor routes
};

// USER
export const userProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [
    /^\/dashboard(?!\/admin|\/mentor|\/chat|\/my-profile)/,
  ],
};


/* ---------------------------------------------
   HELPERS
---------------------------------------------- */
export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.includes(pathname);
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

/* ---------------------------------------------
   DETERMINE WHICH ROLE OWNS A PATH
---------------------------------------------- */
export const getRouteOwner = (
  pathname: string
): "ADMIN" | "MENTOR" | "USER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, mentorProtectedRoutes)) return "MENTOR";
  if (isRouteMatches(pathname, userProtectedRoutes)) return "USER";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

/* ---------------------------------------------
   DEFAULT DASHBOARD ROUTE (AFTER LOGIN)
---------------------------------------------- */
export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "MENTOR":
      return "/dashboard/mentor";
    case "USER":
      return "/dashboard";
    default:
      return "/";
  }
};

/* ---------------------------------------------
   VALIDATE REDIRECT BASED ON ROLE
---------------------------------------------- */
export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  // Public or common routes allowed
  if (!routeOwner || routeOwner === "COMMON") return true;

  // Only allow if the route belongs to the logged-in role
  return routeOwner === role;
};
