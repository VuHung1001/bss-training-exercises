import { useRouter } from "next/router";
import LoaderStyles from "../styles/Loader.module.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MainContext } from "../pages/_app";
// import useScript from '../hooks/useScript';
// import Notification from '../components/Notification'

export default function Index() {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

  const router = useRouter();
  const { isLoggedIn } = useContext(MainContext);

  
  useEffect(() => {
    if (isLoggedIn === "true") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn, router]);
  
  if (router.isFallback) {
    return <div className={LoaderStyles.loader}></div>;
  }

  return (
    <>
      <div className={LoaderStyles.loader}></div>;
    </>
  );
}
