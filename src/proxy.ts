import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // Skip API routes, the Sanity Studio, Next internals and static files.
  matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)",
};
