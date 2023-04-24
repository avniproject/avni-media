import ImageList from '@/components/ImageList';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import jwt from 'jwt-decode'

const validateAccessToken = (token: string) => {
  try {
    if(!token) return false;

    const tokenData: any = jwt(token);
    return tokenData.exp >= Math.floor(Date.now() / 1000);
  } catch(err) {
    console.log('Error occurred--', err);
    return false;
  }
}

export default function Home() {
  const [token, setToken] = useState('')

  useEffect(() => {
    let value: string = '';
    value = localStorage.getItem("authToken") || ""

    if (!validateAccessToken(value))
      Router.push(`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}`);

    setToken(value);
  }, [])

  if(!token) {
    return <div>Loading...</div>;
  }


export default function Home() {
  return (
    <>
      <Navbar />
      <ImageList />
    </>
  )
}
