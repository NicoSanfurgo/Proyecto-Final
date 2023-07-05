import { axiosInstance } from "./index"
import FormData from 'form-data';

export const register = async (user)=> {
	try{
		const formData = new FormData()

		formData.append('email',user.email)
		formData.append('password',user.password)
		formData.append('repeat_password',user.repeat_password)
		formData.append('name',user.name)
		formData.append('lastName',user.lastName)
		formData.append('age',user.age)
		formData.append('phone',user.phone)
		formData.append('avatar',user.avatar)
		delete axiosInstance.defaults.headers.common["Content-Type"]
		const res = await axiosInstance.post(`/auth/signup`,formData,{
			headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
			},
		})

		return res.data
	}catch(err){
		console.error(err)
	}
		
}

export const login = async (user)=> {
	try{
		const res = await axiosInstance.post(`/auth/login`,user)
		return res.data

	}catch(err){
		throw err 
	}
}

export const getUser = async () => {
	try{
		const res = await axiosInstance.get(`auth/user`)
		return res.data
	}catch(err){
		throw err 
	}
}

