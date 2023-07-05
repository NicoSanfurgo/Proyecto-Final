const initState = []
const Cart = (prevState = initState,{ type, payload }) => {
	switch(type){
	case '@cart/saveAll':
		return [
			...payload,
		]
	case '@cart/removeOne':
		return prevState.filter(elem => elem.id !== payload.id)
	case '@cart/add':
		return [ 
			...prevState, 
			payload ]
	case '@cart/removeAll':
		return initState
	default:
		return prevState
	}
}

export default Cart