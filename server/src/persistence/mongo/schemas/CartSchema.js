const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    timestamp : 
        { 
          type: Date,
          default : new Date(),
          required: true 
        },
    user :
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },    
    product:
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
    quantity: 
        {
            type: Number,
            default: 1,
        },
    
})


module.exports = {
        Cart: mongoose.model('Cart',CartSchema)
    } 