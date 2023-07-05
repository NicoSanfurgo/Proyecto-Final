const express = require('express')
const router  = express.Router()
const OrderCtrl = require('../../controllers/OrderController')
const checkAuth = require('../../middlewares/checkAuth')

router.post('/', checkAuth, OrderCtrl.crearPedido)

module.exports = router