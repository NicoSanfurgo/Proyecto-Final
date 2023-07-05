export const saveAll = (products)=>{
	return {
		type: '@products/saveAll',
		payload: products
	}
}

export default {
	saveAll
}