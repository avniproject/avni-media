export function getAppHomeUrl() {
    return isDevMode() ? `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}` : "/";
}

export function getUserName() {
    return isDevMode() ? `${process.env.NEXT_PUBLIC_LOCAL_DEV_USER}` : "";
}

export function isDevMode() {
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
    return env === "dev";
}
