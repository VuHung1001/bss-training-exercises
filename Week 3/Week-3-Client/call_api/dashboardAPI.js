import axios from 'axios'
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

export const logout = async (username) =>{
  try {
		const response = await userRequest().get(
			`/auth/logout/${username}`
		)
		return response.data
	} catch (error) {
		console.dir(error)
	}
}