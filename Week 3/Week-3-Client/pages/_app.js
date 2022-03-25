import '../styles/globals.css'
import Layout from '../components/Layout'
import { createContext, useEffect, useState } from 'react';
import Head from 'next/head'
import Script from 'next/script'

export const MainContext = createContext();

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(()=>{
    if(window){
      setIsLoggedIn(sessionStorage.getItem('isLoggedIn'))
      setTitle(sessionStorage.getItem('title'))
      setMessage(sessionStorage.getItem('message'))
      setType(sessionStorage.getItem('type'))
      setDuration(sessionStorage.getItem('duration'))
    }
  }, [])

  return (
    <MainContext.Provider value={{isLoggedIn, title, message, type, duration}}>  
      <Head>
        <title>HungVP Week 3</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* jquery */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></Script>     
      {/* chart js library */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></Script>           
    </MainContext.Provider>
  )
}

export default MyApp
