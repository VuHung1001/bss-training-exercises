import DashboardCom from "../components/DashboardCom"
import Menus from "../components/Menus"
import {getDevices} from '../call_api/dashboardAPI'
import { useContext } from 'react';
import { MainContext } from '../pages/_app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import useScript from '../hooks/useScript';

const Dashboard = ({devices}) => {
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  // useScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js')

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

  if(res.devices)
	return {
		props: {
			devices: res.devices
		}
	}
}

export default Dashboard