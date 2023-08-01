import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import {redirectIfNotValid} from '@/utils/helpers';

import {storeToken} from "../utils/helpers";
import {useRouter} from 'next/router';

export default function Home() {
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
    const router = useRouter();
    if (env === "dev") {
        //useSearchParams doesn't seem to work
        if (router.asPath.includes("/?authToken=")) {
            const authToken = router.asPath.replace("/?authToken=", "");
            storeToken(authToken);
        }
    }

    redirectIfNotValid();
    return (
        <>
            <Navbar/>
            <ImageList/>
        </>
    )
}
