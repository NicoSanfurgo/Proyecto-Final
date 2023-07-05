const OrderModel = require('../persistence/PersistenceFactory')('Order')
const Mail = require('../messaging/mail')
const WhatsApp = require('../messaging/whatsapp')
const Sms = require('../messaging/sms')
const logger = require('../logger')

class OrderService{
    constructor(OrderModel){
        this.OrderModel = OrderModel
    }

    async createOrder(user){
        const order = await this.OrderModel.create(user.id)
            
        //Envio de Email a Administrador
        await Mail.newOrder(user,order.products)

        //Envio de Whatsapp a Administrador   
        await WhatsApp.newOrder(user)

        //Envio de Sms a User
        await Sms.userNewOrder(user.phone)
        
        logger.info(`Se ha creado un nuevo Pedido,${order.number}, usuario: ${user.email}`)

        return order
    }
}

module.exports = new OrderService(OrderModel) 