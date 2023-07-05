import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingBasketLine, RiSearchLine } from 'react-icons/ri'
import { Header as HeaderStyle,
		Logo, 
		NavBar } 
		from './styles' 

import AsideContainer from '../AsideContainer'
import Cart from '../Cart'
import logo from './logo.svg'
import useUser from '../../hooks/useUser'
import config from '../../config'


function Header() {
	const [showCart, setShowCart] = useState(false)
	const { isLogged, user, logout, getUser } = useUser()

	const handleLogout = async ()=>{
		await logout()
		alert('Ha cerrado sesion')
	}

	useEffect(() => {
		if(!isLogged){
			console.log('getting user')
			getUser()
		} 
	}, [])

	return (
		<>	
			<HeaderStyle>
				<Logo><Link to='/'><img src={logo} alt= "logo"  /></Link></Logo>
				<NavBar>
				{ isLogged ? 
					<>
						<li className="search">  <RiSearchLine/></li>
						<li className="cart" onClick={()=> setShowCart(true) }><RiShoppingBasketLine/></li>
						<li className="email"> { user.email } </li>
						<li className="avatar"> <img src ={`${config.URL}/${user.avatar}`} /></li>
						<li className="logout"><a onClick={ handleLogout } >Logout</a></li>
					</>
				:
					<>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/register">Register</Link></li>
					</>
					
				}
				</NavBar>
			</HeaderStyle>
			
			{ isLogged && 
			<AsideContainer state= {showCart} onClose = {()=> setShowCart(false)}>
				 <Cart />
			</AsideContainer>
			}
		</>
        

        
	)
}

export default Header
