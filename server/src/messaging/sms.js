const config = require('../config')
const client = require('twilio')(config.TWILIO_ACCOUNTSID,config.TWILIO_AUTH_TOKEN)
const logger = require('../logger')

const userNewOrder = async (phone) => {
    try{
         await client.messages.create({
            body: `Su pedido ha sido recibido y se encuentra en proceso`,
            from: config.TWILIO_NUMBER,
            to: phone
        })
    }catch(err){
        logger.error(`Ha ocurrido un error al enviar un sms ${err.message}, Numero: ${phone}`)
    }
    
}

module.exports = { userNewOrder }