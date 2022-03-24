import LogsCom from "../../components/LogsCom"
import Menus from "../../components/Menus"
import { useContext } from 'react';
import {getAllLogs, getLogsByPageQuery} from '../../call_api/logsAPI'
import { MainContext } from '../_app';

const Logs = ({logs}) => {
  const { isLoggedIn } = useContext(MainContext);

  return (
      <Menus>
        <LogsCom props={{logs}}/>
      </Menus>
  )
}

export const getStaticProps = async () => {
	const res = await getAllLogs()
  const logs = res.logs

	return {
		props: {
			logs
		}
	}
}

export default Logs