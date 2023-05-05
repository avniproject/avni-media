import jwt from 'jwt-decode';

export const validateAccessToken = () => {
    try {
        const token = localStorage.getItem("authToken") || ""

        if(!token) return false;

        const tokenData: any = jwt(token);
        return tokenData.exp >= Math.floor(Date.now() / 1000);
    } catch(err) {
      console.log('Error occurred--', err);
      return false;
    }
}

export const redirectIfNotValid = () => {
    if (typeof window === "undefined") {
        return;
    }

    if (!validateAccessToken()) {
        console.log('second case.......', `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}`);
        window.location.href = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}`;
        return;
    }
}