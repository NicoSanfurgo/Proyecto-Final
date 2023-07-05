const logger = require("../logger")
const mail = require("../messaging/mail")


module.exports =  async (error, req, res, next) => {
    try{
        if(error.name == "ValidationError"){
            return res.status(422).json({ code: 422, message: error.message });
        }
        logger.error(error.message, error)
        await mail.sendEmailError(error)
        return res.status(500).json({ error : 'Ha ocurrido un Error' })
    }catch(err){
        return res.status(500).json({ error : 'Ha ocurrido un Error' })
    }
   
    
   
}