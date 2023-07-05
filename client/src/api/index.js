import axios from 'axios'
import config from '../config'

const urlAPI = `${config.URL}/api`

export const axiosInstance = axios.create({
    baseURL: urlAPI,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('token')
        if(token){
            config.headers["Authorization"] = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


