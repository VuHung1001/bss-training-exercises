import DashboardCom from "../components/DashboardCom"
import Menus from "../components/Menus"
import { useContext } from 'react';
import {getDevices} from '../call_api/dashboardAPI'
import { MainContext } from '../pages/_app';

const dashboard = ({devices}) => {
  const { isLoggedIn } = useContext(MainContext);

  return (
      <Menus>
        <DashboardCom props={{devices}}/>
      </Menus>
  )
}

export const getStaticProps = async () => {
	const res = await getDevices()
  const devices = res.devices

	return {
		props: {
			devices
		}
	}
}

export default dashboard