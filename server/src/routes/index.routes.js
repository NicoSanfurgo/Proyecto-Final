const express = require('express')
const checkAuthRedirect = require('../middlewares/checkAuthRedirect')
const CartService = require('../services/CartService')
const ProductService = require('../services/ProductService')
const router = express.Router()

router.get('/', async (req, res ) => {
   return res.redirect('/productos')
})

router.get('/carrito', checkAuthRedirect, async (req, res ) => {

    const cartItems = await CartService.getAll(req.user.id)
    
    return res.render('carrito/index',{
        cartExists: Boolean(cartItems.length),
        cartItems: cartItems,
        title: `Carrito ${cartItems.length || null}` 
    })
})

module.exports = router