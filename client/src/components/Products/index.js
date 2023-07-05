import useProducts from '../../hooks/useProducts'
import ProductCard from '../ProductCard'
import { BackNav, ProductList } from './Styles'

export default function Products() {
	const { products = [], isLoading } = useProducts()

	return (
		<>
			<BackNav>
				<span>/home</span>
				<ProductList>
					{ isLoading && <h1> ...Cargando </h1> } 
					{ !isLoading && products.map((product) => (
						<ProductCard product = {product} key= {product._id} />
					))}
				</ProductList>
			</BackNav>

			
		</>
	)
}
