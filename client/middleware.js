const etlService = process.env.NEXT_PUBLIC_ETL_MIDDLEWARE;
const mainService = process.env.NEXT_PUBLIC_WEB_MIDDLEWARE;

import {NextResponse} from 'next/server'


export function middleware(request) {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/web') || pathname.startsWith("/location")) {
        const url = new URL(pathname + request.nextUrl.search, mainService);
        return NextResponse.rewrite(url);
    }
    if (pathname.startsWith('/etl')) {
        const url = new URL(pathname.replace("/etl", "") + request.nextUrl.search, etlService);
        return NextResponse.rewrite(url);
    }
    if (pathname.startsWith('/media')) {
        const url = new URL(pathname + request.nextUrl.search, etlService);
        return NextResponse.rewrite(url);
    }
}
