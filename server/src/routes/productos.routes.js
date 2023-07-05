const express = require('express')
const checkAuthRedirect = require('../middlewares/checkAuthRedirect')
const ProductService = require('../services/ProductService')
const router = express.Router()

router.get('/', checkAuthRedirect, async (req, res ) => {
    const products = await ProductService.getAll()
    return res.render('productos/index',{ 
        isLogged: Boolean(req.user),
        title: 'Productos', 
        productsExists: Boolean(products.length),
        products: products
    })
})

router.get('/:id', checkAuthRedirect, async (req, res ) => {
    const { id } = req.params
    const product = await ProductService.getById(id)

    return res.render('productos/show',{ 
        isLogged: Boolean(req.user),
        title: `Producto ${product?.title}`, 
        productExists: Boolean(product),
        product: product
    })
})

module.exports = router