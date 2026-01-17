import { intlayerMiddleware } from "next-intlayer/middleware";

export default intlayerMiddleware;

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
  