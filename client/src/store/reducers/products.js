const Products = (prevState = [], { type, payload } ) => {
	switch(type) {
	case '@products/saveAll':
		return [
			...payload
		]

	default:
		return prevState
	}
}

export default Products