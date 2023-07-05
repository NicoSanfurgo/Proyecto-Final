const Joi = require("joi")
const validateRequest = require('./validateRequest')

module.exports = {
    registerValidator: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .trim()
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            repeat_password: Joi.string()
                .required()
                .valid(Joi.ref('password')),
            name: Joi.string()
                .trim()
                .min(5)
                .max(255)
                .required(),
            lastName: Joi.string()
                .min(5)
                .max(255)
                .required(),
            age: Joi.number()
                .min(0)
                .max(100)
                .required(),
            phone: Joi.string()
                .trim()
                .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
                .required()
        })
        
        validateRequest(req, next, schema)
    },
    loginValidator: (req, res, next) => {
        console.log(req.body)
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .trim()
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
        })
        validateRequest(req, next, schema)
    }
}