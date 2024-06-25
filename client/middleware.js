const etlService = process.env.NEXT_PUBLIC_ETL_MIDDLEWARE;
const mainService = process.env.NEXT_PUBLIC_WEB_MIDDLEWARE;

import {NextResponse} from 'next/server'

console.log("Middleware used");

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    console.log("Path:", pathname, "AuthToken:", request.headers.get("Auth-Token"));

    if (pathname.startsWith('/web') || pathname.startsWith("/location")) {
        const url = new URL(pathname + request.nextUrl.search, mainService);
        console.log("Rewriting to ", JSON.stringify(url));
        return NextResponse.rewrite(url);
    }
    if (pathname.startsWith('/etl')) {
        console.log(request.nextUrl);
        const url = new URL(pathname.replace("/etl", "") + request.nextUrl.search, etlService);
        console.log("Rewriting to ", JSON.stringify(url));
        return NextResponse.rewrite(url);
    }
    if (pathname.startsWith('/media')) {
        console.log(request.nextUrl);
        const url = new URL(pathname + request.nextUrl.search, etlService);
        console.log("Rewriting to ", JSON.stringify(url));
        return NextResponse.rewrite(url);
    }
}
