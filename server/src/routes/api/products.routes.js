const express = require('express')
const router = express.Router()
const mdwCheckAdmin = require('../../middlewares/checkAdmin')
const productCtrl = require('../../controllers/ProductController')
const { saveProductValidator, updateProductValidator } = require('../../middlewares/validator/productValidator')

router.get('/:id?', productCtrl.listar )
router.post('/', mdwCheckAdmin, saveProductValidator, productCtrl.agregar )
router.put('/:id', mdwCheckAdmin,updateProductValidator, productCtrl.actualizar )
router.delete('/:id', mdwCheckAdmin, productCtrl.borrar)

module.exports = router