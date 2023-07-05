import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAll } from '../api/product'
import Actions from '../store/actions'

export default function useProducts(){
	const dispatch = useDispatch()
	const products = useSelector((state) => state.Products)
	const [ isLoading, setIsLoading ] = useState(false)
	useEffect( ()=>{
		setIsLoading(true)
		getAll().then( data => {
			setIsLoading(false)
			dispatch(Actions.Products.saveAll(data))
		}).catch(err => console.log(err))
	},[dispatch])
    
	return { products, isLoading}
}