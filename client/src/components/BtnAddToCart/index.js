import { useCallback } from 'react'
import useCart from '../../hooks/useCart'
import useUser from '../../hooks/useUser'
import { AddCartButton, RemoveCartButton, ButtonContainer} from './Styles'

function BtnAddToCart({idProduct}) {

    const { cartItems, addNew, remove } = useCart()
    const { isLogged } = useUser()

    const isAdded = useCallback(
        () => {
            if(!isLogged) return false
            let itemCart = cartItems.find( (cartProduct)=> cartProduct.product.id == idProduct )
            return itemCart
        }   
        ,[cartItems]
    )

	const handleButton = () => {
        if(!isLogged ) return alert('Debe Iniciar Sesion ')

        const item = isAdded()

        if( !item ){
            addNew(idProduct)
        }else{
            remove(item.id)
        }
	}
    return (

        <>
            { !isAdded() ? 
                <ButtonContainer role="button"
                onClick= { handleButton } >
                   <AddCartButton 
                    /> 
                </ButtonContainer>
                
                : 
                    <RemoveCartButton 
                        role="button"
                        onClick= { handleButton } 
                    />
            }
        </>
       
    )
}

export default BtnAddToCart
