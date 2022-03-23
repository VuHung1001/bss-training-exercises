import '../styles/globals.css'
import Layout from '../components/Layout'
import { createContext, useEffect, useState } from 'react';

export const MainContext = createContext();

function MyApp({ Component, pageProps, session }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(()=>{
    if(window){
      setIsLoggedIn(sessionStorage.getItem('isLoggedIn'))
    }
  }, [])

  return (
    <MainContext.Provider value={{isLoggedIn}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainContext.Provider>
  )
}

export default MyApp
