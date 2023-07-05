const fs = require('fs')

function validateRequest(req, next, schema){
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknow: true
    }
    const { error, value } = schema.validate(req.body, options);
    if (error){
        const validationError = new Error()
        validationError.name = "ValidationError"
        validationError.message = error.details.map(x => x.message).join(', ')
        if(req?.file?.path){
            console.log(req.file.path)
            fs.unlink(req.file.path, (err)=>{
                if(err){
                    console.error(err)
                    return
                }
            })
        }
        next(validationError)
    } else {
        req.body = value;
        next();
    }
}

module.exports = validateRequest