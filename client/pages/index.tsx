import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import { redirectIfNotValid } from '@/utils/helpers'

export default function Home() {
  redirectIfNotValid();
  return (
    <>
      <Navbar />
      <ImageList />
    </>
  )
}
