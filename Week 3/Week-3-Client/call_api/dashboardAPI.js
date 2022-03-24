import {userRequest} from '../config/axios.config'


export const getDevices = async () => {
	try {
		const response = await userRequest().get(
			`/devices`
		)
		return response.data
	} catch (error) {
		console.dir(error)
	}
}

export const addDevice = async (device) =>{
  try {
		const response = await userRequest().post(
			`/devices`,
			device
		)
		return response.data
	} catch (error) {
		console.dir(error)
	}
}