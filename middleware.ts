export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        '/((?!api/auth/:path*|login|logout|_next/static|_next/image|favicon.ico|sw.js|workbok-*.js|static/manifest.json|static/icons/*.png).*)'
    ],
}
