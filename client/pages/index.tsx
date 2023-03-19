import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Card, Checkbox, Grid } from '@nextui-org/react';
import ImageList from '@/components/ImageList'
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
// import Dropdown from '@/components/FilterComponent-old/LocationHierarchy'
import Filter from '@/components/FilterComponent/Filter';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Navbar />
    <Filter />
    <ImageList />

     {/* {img.map((item, index) => (
     <div className='flex'>
       <Card css={{ p: "$6", mw: "400px" }}>
       <Card.Header>
  
       < img  key={index} src={item.images} alt="image"   width={500}
       height={500} />
       </Card.Header>
   <Card.Body>
    Image name  
   </Card.Body>
   <Card.Footer>
   <Checkbox><select name=" " id=""></select> select Image </Checkbox>
   </Card.Footer>

   </Card>
   </div>
     ))} */}


  
    </>
  )
}
