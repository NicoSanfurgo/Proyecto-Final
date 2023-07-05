const config = require('../config')
const client = require('twilio')(config.TWILIO_ACCOUNTSID,config.TWILIO_AUTH_TOKEN)
const logger = require('../logger')
 const  newOrder = async (user) => {
     try{
      await client.messages.create({
            body: `Nuevo Pedido de ${user.name} - ${user.email}`,
            from: `whatsapp:${config.TWILIO_WHATSAPP}`,
            to: `whatsapp:${config.TWILIO_ADMIN_NUMBER}`
        })
     }catch(err){
        logger.error(`Ha ocurrido un error al enviar el mensaje ${err.message}`)
     }
    
}

module.exports = { newOrder }