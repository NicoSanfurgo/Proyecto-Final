import useCart from '../../hooks/useCart'
import { useCallback, useState } from 'react'

function CartPage() {

    const { remove, cartItems, confirm } = useCart()
    const [ order, setOrder ] = useState([])

	const handleDelete = (id) => {
		remove(id)
	}

    const handleConfirm =  async () => {
        const { products } = await confirm()
        setOrder(products)
    }

    const getTotal = useCallback(()=>{
        if(cartItems.length > 1){
            let total = 0
            cartItems.forEach(ele => {
                total = total + Number(ele.product.price)
            });
            return total
        }
        return cartItems[0].product?.price

    },[cartItems])

    return (
        <>
            { !order.length && 
             <div>
             <h1>Carrito</h1>
 
             { !cartItems.length && <span> No hay nada en el Carrito</span> }
 
             <ul>
                 { cartItems && cartItems.map((item) => (
                     <li key={item.id}>
                         { item.product.title } ${ item.product.price }
                         <button onClick={() => handleDelete(item.id) } >Eliminar</button>
                     </li>
                 )) }
 
             </ul>
              { cartItems.length > 0 &&  <p>Total: ${ getTotal() }</p> }
             
             {cartItems.length > 0 && <button onClick = {handleConfirm}>Confirmar Pedido</button>  } 
         </div>
            }

            {order.length > 0 &&
                <>
                    <h1>Se ha confirmado tu Pedido </h1>

                    {order.map((item) => (
                        <span>{item.title} </span>
                        )
                    )}
                </>

            }

        </>



         
      
    )
}

export default CartPage
