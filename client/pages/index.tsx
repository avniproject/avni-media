import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import {redirectIfNotValid} from '@/utils/helpers';
import {storeToken} from "../utils/helpers";
import {useRouter} from 'next/router';
import {isDevMode} from "@/utils/ConfigUtil";


export default function Home() {
    const router = useRouter();
    if (isDevMode()) {
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
