export function getAppHomeUrl() {
    return isDevMode() ? `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}` : "/";
}

export function isDevMode() {
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
    return env === "dev";
}
