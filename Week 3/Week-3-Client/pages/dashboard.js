import DashboardCom from "../components/DashboardCom"
import Menus from "../components/Menus"
import {getDevices} from '../call_api/dashboardAPI'
import { useContext } from 'react';
import { MainContext } from '../pages/_app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = ({devices}) => {

  const router = useRouter();
  const { isLoggedIn } = useContext(MainContext); 

  useEffect(()=>{
    if(isLoggedIn === 'false') {
      router.push('/login')
    }
  }, [isLoggedIn, router])  

  return (
      <Menus>
        <DashboardCom props={{devices}}/>
      </Menus>
  )
}

export const getStaticProps = async () => {
	const res = await getDevices()
  const devices = null
  if(res.devices)
    devices = res.devices

	return {
		props: {
			devices
		}
	}
}

export default Dashboard