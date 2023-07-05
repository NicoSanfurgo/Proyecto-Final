import { axiosInstance } from "./index"

export  const getAll = async ()=>{
	try{
		const res = await axiosInstance.get('/carrito')
		return res.data.cart
	}catch(err){
		console.error(err)
	}
}
export const addNew = async (id)=> {
	try{
		const res = await axiosInstance.post(`/carrito/${id}`)
		return res.data.producto

	}catch(err){
		console.error(err)
	}
}
export const remove = async (id)=> {
	try{
		const res = await axiosInstance.delete(`/carrito/${id}`)
		return res.data.producto
	}catch(err){
		console.error(err)
	}
}
export const confirm = async ()=> {
	try{
		const res = await axiosInstance.post(`/order`)
		return res.data.order
	}catch(err){
		console.error(err)
	}
}