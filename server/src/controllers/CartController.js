const CartService = require('../services/CartService')

class CartController{
    constructor(){
    }
    async listar(req,res){
        try{
            const id = req.params.id
            if( !id ) return res.json( { cart: await CartService.getAll(req.user.id) })
            
            const cartProduct =  await CartService.get(id, req.user.id)
        
            if( cartProduct == undefined ) return res.json({error: 'No se encontro el articulo en el carrito'})
    
            return res.json({cartProduct: cartProduct})

        }catch(err){
            console.log(err)
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
        
    }

    async agregar(req,res){
        try{
            const { id_producto } = req.params
            const { quantity = 1 } = req.query
            const cartProduct = await CartService.add(id_producto, quantity, req.user.id)

            if(cartProduct == null || cartProduct == undefined ) return res.status(400).json({error: 'El producto no existe o ya se encuentra en el carrito'})
    
            return res.json({ producto : cartProduct })
    
        }catch(err){
            
            console.error(err)
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
       
    }

    async actualizarCantidad(req, res ){
        try{
            const { id } = req.params
            const { quantity } = req.query
    
            const cartProduct = await CartService.updateQuantity(id, quantity, req.user.id)
            if(cartProduct == undefined ) return res.status(400).json({message: 'Ha ocurrido un error'})
            
            return res.json({producto : cartProduct}) 
        }catch(err){
            console.error(err)
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
        
    }

    async borrar(req,res){
        try{
            const producto = await CartService.remove(req.params.id,req.user.id)

            if(producto == undefined || producto == null ) return  res.json({error: 'No se encontro producto en carrito'})
        
            return res.json({message: 'Se ha eliminado el producto', producto: producto})

        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
       
    }
}

module.exports = new CartController()