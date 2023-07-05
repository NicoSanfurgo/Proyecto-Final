const initState = {
	isLogged:false
}

const User = (prevState = initState, { type, payload } ) => {
	switch(type) {
	case '@user/save':
		return { ...payload }
	case '@user/logout':
		return initState
	default:
		return prevState
	}
}

export default User