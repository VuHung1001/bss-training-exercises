import {userRequest} from '../config/axios.config'


export const getAllLogs = async () => {
	try {
		const response = await userRequest().get(
			`/logs`
		)
    
		return response.data
	} catch (error) { 
		console.dir(error)
		return {error: true}
	}
}

export const getLogsByPageQuery = async (page=1, limit=5) => {
	try {
		const response = await userRequest().get(
			`/logs` + (page ? '?page='+page : '') + (limit ? '&limit='+limit : '')
		)
    
		return response.data
	} catch (error) {
		console.dir(error)
		return {error: true}
	}
}

export const getLogsByPagePath = async (page=1, limit=5) => {
	try {
		const response = await userRequest().get(
			`/logs`+ (page ? '/'+page : '') + (limit ? '?limit='+limit : '')
		)
    
		return response.data
	} catch (error) {
		console.dir(error)
		return {error: true}
	}
}

