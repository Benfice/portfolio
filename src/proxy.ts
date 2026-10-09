import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // Skip API routes, Next internals and static files.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
