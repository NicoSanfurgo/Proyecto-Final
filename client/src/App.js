import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CartPage  from './pages/CartPage'
import ProductPage from './pages/ProductPage'

function App(){ 

	return (
		<>
			<Router>
				<Header/>
				<Switch>
					<Route component={ Home} exact path="/" />
					<Route component={ RegisterPage} exact path="/register" />
					<Route component={ LoginPage} exact path="/login" />
					<Route component={ CartPage } exact path="/cart" />
					<Route component={ ProductPage } exact path="/product/:id" />
				</Switch>
			</Router>
		</>
    
	)
}

export default App