const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    timestamp : 
        { 
          type: Date,
          default : new Date(),
          required: true 
        },
    number: 
        {
            type: Number,
            default: 0
        },
    user :
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },    
    products :
        { 
            type: [ mongoose.Mixed ],
            default: undefined,
            required: true
        },
    status: 
        {
            type: String,
            default: 'generada'
        }
    
})


module.exports = {
    Order : mongoose.model('Order',OrderSchema)
}