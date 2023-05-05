import DownloadList from "@/components/DownloadComponent/DownloadList";
import Navbar from "@/components/Navbar";
import { redirectIfNotValid } from '@/utils/helpers'

export default function downloadList(){
    redirectIfNotValid();
    return (
        <>
        <Navbar />
        <DownloadList />
        </>
    )
}