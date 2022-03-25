import LogsCom from "../components/LogsCom"
import Menus from "../components/Menus"
import { useContext } from 'react';
import { MainContext } from './_app';
import {getAllLogs} from '../call_api/logsAPI'
import { useEffect } from "react";
import { useRouter } from "next/router";

const Logs = ({logs}) => {
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
  const logs = {}
  if(res.logs)
    logs = res.logs
  

	return {
		props: {
			logs
		}
	}
}

export default Logs