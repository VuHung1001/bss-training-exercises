import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = () => axios.create({
    baseURL: BASE_URL,
    headers: { isloggedin: true }
})