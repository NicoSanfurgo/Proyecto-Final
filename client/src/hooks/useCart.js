import { useDispatch,useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getAll, remove as removeService, addNew as addNewService, confirm as confirmService} from '../api/cart'
import Actions from '../store/actions'

export default function useCart(){

	const dispatch = useDispatch()
	const cartItems = useSelector((state) => state.Cart)

    const loadCart = useCallback(()=>{
            getAll()
            .then( data => { 
                dispatch(Actions.Cart.saveAll(data))
             })
            .catch(err => console.log(err))
		
	},[dispatch])
    
    const remove = useCallback(
        async (id) => {
            try{
                const data = await removeService(id)
                dispatch(Actions.Cart.removeOne(data))
            }catch(err){
                console.log(err)
            }
    },[dispatch])

    const addNew = useCallback( 
        async (id) => {
            try{
                const data = await addNewService(id)
                dispatch(Actions.Cart.add(data))
            }catch(err){
                console.error(err)
            }
        }
    ,[dispatch])

    const confirm = useCallback(
        async () => {
            try{
                const order = await confirmService()
                dispatch(Actions.Cart.removeAll())
                return order
            }catch(err){
                console.error(err)
            }	
	},[dispatch])

   

	return { cartItems, loadCart, remove, addNew, confirm}
}