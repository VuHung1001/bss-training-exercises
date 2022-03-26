import '../styles/globals.css'
import Layout from '../components/Layout'
import { createContext, useEffect, useState } from 'react';
import Head from 'next/head'
import Script from 'next/script'
// import useScript from '../hooks/useScript';

export const MainContext = createContext();

function MyApp({ Component, pageProps }) {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

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
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy='beforeInteractive'
      ></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"
        strategy='beforeInteractive'
      ></Script>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />      
        <title>HungVP Week 3</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>        
    </MainContext.Provider>
  )
}

export default MyApp
