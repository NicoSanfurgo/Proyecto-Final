document.addEventListener('DOMContentLoaded', () => {

    const addToCart = document.getElementById('addToCart')
    
    addToCart.addEventListener('submit',async (e)=>{
        try{
            e.preventDefault()
            const quantity = document.getElementById('quantity').value
            const URI = addToCart.target

            const res = await fetch(`${URI}?quantity=${quantity}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }            
            })
            const jsonData = await res.json()
            console.log(jsonData)

            if(res.status == 500){
              return alert('Ha ocurrido un error')
            }
            if(res.status == 400) {
                return  alert('El producto ya se encuentra en el carrito')
            }
            return  alert('Se ha agregado el elemento al carrito')
        }catch(err){
            console.log(err)
        }
    })
})
