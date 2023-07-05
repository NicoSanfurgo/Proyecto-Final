export const saveAll = (cartItems) => ({
	type: '@cart/saveAll',
	payload: cartItems,
})
export const add = (item) => ({
	type: '@cart/add',
	payload: item,
})

export const removeOne = (item) => ({
	type: '@cart/removeOne',
	payload: item,
})

export const removeAll = () => ({
	type: '@cart/removeAll',
})


export default {
	saveAll,
	add,
	removeOne,
	removeAll
}
