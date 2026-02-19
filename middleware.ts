import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isAdminDashboard = createRouteMatcher(["/admin/dashboard(.*)"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
    if (isAdminDashboard(request) && !convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, "/admin/login");
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
