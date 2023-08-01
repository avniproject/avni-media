import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import {redirectIfNotValid} from '@/utils/helpers';

import {storeToken} from "../utils/helpers";
import {useRouter} from 'next/router';

function saveTokenInDevEnv() {
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
    if (env === "dev") {
        //useSearchParams doesn't seem to work
        const router = useRouter();
        if (router.asPath.includes("/?authToken=")) {
            const authToken = router.asPath.replace("/?authToken=", "");
            storeToken(authToken);
        }
    }
}

export default function Home() {
    saveTokenInDevEnv();

    redirectIfNotValid();
    return (
        <>
            <Navbar/>
            <ImageList/>
        </>
    )
}
