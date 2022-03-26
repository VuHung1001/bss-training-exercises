import LogsCom from "../components/LogsCom"
import Menus from "../components/Menus"
import { useContext } from 'react';
import { MainContext } from './_app';
import {getAllLogs} from '../call_api/logsAPI'
import { useEffect } from "react";
import { useRouter } from "next/router";
// import useScript from '../hooks/useScript';

const Logs = ({logs}) => {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

  const router = useRouter();
  const { isLoggedIn } = useContext(MainContext); 

  useEffect(()=>{
    if(isLoggedIn === 'false') {
      router.push('/login')
      window.clearTimeout(timeout)
    }
  }, [isLoggedIn, router])  

  return (
      <Menus>
        <LogsCom props={{logs}}/>
      </Menus>
  )
}

export const getStaticProps = async () => {
	const res = await getAllLogs()
  
  if(res.logs)
	return {
		props: {
			logs: res.logs
		}
	}
}

export default Logs