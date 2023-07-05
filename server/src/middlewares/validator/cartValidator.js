const Joi = require("joi")

module.exports = {

    updateQuantityValidator: (req, res, next) => {
        const schema = Joi.object({
            quantity:Joi.number()
                .min(1)
        })

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknow: true
        }
        const { error, value } = schema.validate(req.query, options)
        if(error){
            const validationError = new Error()
            validationError.name = "ValidationError"
            validationError.message = error.details.map(x => x.message).join(', ')
            next(validationError)
        }else{
            req.query = value
            next()
        }
        
    }
}