import { Inter } from 'next/font/google';
import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import Filter from '@/components/FilterComponent/Filter';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />
      <Filter />
      <ImageList />
    </>
  )
}
