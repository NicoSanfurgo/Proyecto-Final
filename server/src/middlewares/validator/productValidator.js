const Joi = require("joi")
const validateRequest = require('./validateRequest')

module.exports = {
    saveProductValidator: (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string()
                .min(5)
                .max(45)
                .required(),
            description: Joi.string()
                .min(5)
                .max(255)
                .required(),
            code: Joi.string()
                .required(),
            price: Joi.number()
                .min(0)
                .required(),
            thumbnail: Joi.string()
                .required(),
            stock:Joi.number()
                .min(0)
                .required(),
        })
        
        validateRequest(req, next, schema)
    },
    updateProductValidator: (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string()
                .min(5)
                .max(45),
            description: Joi.string()
                .min(5)
                .max(255),
            code: Joi.string(),
            price: Joi.number()
                .min(0),
            thumbnail: Joi.string()
                .min(1),
            stock:Joi.number()
                .min(0)
        })
        validateRequest(req, next, schema)
    }
}