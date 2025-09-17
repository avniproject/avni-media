import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import {redirectIfNotValid} from '@/utils/helpers';
import {storeToken} from "../utils/helpers";
import {useRouter} from 'next/router';
import {isDevMode} from "@/utils/ConfigUtil";
import {useEffect} from 'react';


export default function Home() {
    const router = useRouter();
    
    useEffect(() => {
        if (isDevMode()) {
            //useSearchParams doesn't seem to work
            if (router.asPath.includes("?authToken=")) {
                const authToken = router.asPath.split("?authToken=")[1];
                storeToken(authToken);
            }
        }
    }, [router.asPath]);

    redirectIfNotValid();
    return (
        <>
            <Navbar/>
            <ImageList/>
        </>
    )
}
