const save = (user)=>{
	return {
		type: '@user/save',
		payload: {...user, isLogged: true }
	}
}

const logout = ()=>{
	return {
		type: '@user/logout',
	}
}

export default {
	save,
	logout
}