import { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { useHistory } from 'react-router-dom'

function LoginPage() {
	const history = useHistory()
	const [ formData, setFormData ] = useState({})
 	const { login, loading, error, isLogged } = useUser()

	useEffect(() => {
	  if(isLogged){ 
		history.push('/')}
	},[isLogged])

	const handleChange = (e)=> {
		setFormData({...formData,[e.target.name]: e.target.value })
	}


	const submitForm = async (e) => {
		e.preventDefault()
		await login(formData)
	}

	return (
		<div>
			<h1>Ingreso</h1>
			{ loading && <span>Loading...</span>}
			{ error && <span> { error }</span> }
			<form>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="text" placeholder ="your email" name= "email" onChange ={handleChange} />
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input type="password" placeholder ="your password" name= "password" onChange ={handleChange} />
				</div>
				
				
				<button onClick={submitForm} disabled = { loading }> Iniciar Sesion </button>

			</form>
		</div>
	)
}


export default LoginPage
