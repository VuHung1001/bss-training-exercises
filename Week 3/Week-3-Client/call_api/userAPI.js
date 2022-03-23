import axios from 'axios'
import {publicRequest} from '../config/axios.config'

export const login = async (username, password) => {
	try {
		const response = await publicRequest.post(
			`/auth/login`
      , {username, password}
		)
		return response.data
	} catch (error) {
		console.dir(error)
	}
}

export const logout = async (username) =>{
  try {
		const response = await publicRequest.get(
			`/auth/logout/${username}`
		)
		return response.data
	} catch (error) {
		console.dir(error)
	}
}