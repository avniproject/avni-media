const mediaViewerService = "http://localhost:8023/media-viewer";
const etlService = "http://localhost:8022/";
const mainService = "http://localhost:8021/";

import {NextResponse} from 'next/server'

// console.log("Middleware used");

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    // console.log("Path:", pathname);

    if (pathname.startsWith('/web') || pathname.startsWith("/location")) {
        const url = new URL(pathname, mainService);
        // console.log("Rewriting to ", JSON.stringify(url));
        return NextResponse.rewrite(url);
    }
    if (pathname.startsWith('/etl')) {
        // console.log(request.nextUrl);
        const url = new URL(pathname.replace("/etl", "")+request.nextUrl.search, etlService);
        // console.log("Rewriting to ", JSON.stringify(url));
        return NextResponse.rewrite(url);
    }
    if (pathname.startsWith('/media-viewer')) {
        return NextResponse.rewrite(new URL(pathname, mediaViewerService))
    }
}
