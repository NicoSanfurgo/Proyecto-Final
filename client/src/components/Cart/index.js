import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import useCart from '../../hooks/useCart'
import { Container } from './Styles'

function Cart() {

	const { remove, loadCart, cartItems } = useCart()

	useEffect(() => {
		 loadCart()
	}, [])

	const handleDelete = (id) => {
		remove(id)
	}
	return (
		<Container>
			<h1>Carrito</h1>
			{ !cartItems.length && <span> No hay nada en el Carrito</span> }

			<ul>
				{ cartItems && cartItems.map((item) => (
					<li key={item.id}>
						{ item.product.title }
						<button onClick={() => handleDelete(item.id) } >Eliminar</button>
					</li>
				)) }

			</ul>

			{ cartItems.length > 0 && <h5><Link to="/cart">Comprar!</Link></h5>
 }
		</Container>
	)
}

export default Cart
