import { axiosInstance } from './index'

export const getAll = async ()=>{
	try{
		const { data, status } = await axiosInstance.get('/productos')
		if(status != 200 ) return []
		return data.productos

	}catch(err){
		console.error(err)
	}
}

export const getOne = async (id) => {
	try {
		const { data, status } = await axiosInstance.get(`/productos/${id}`)
		console.log(data)
		if( status != 200 ) return {}
		return data.producto
	}catch(err){
		throw err
	}
}