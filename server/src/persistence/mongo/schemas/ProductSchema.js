const mongoose = require('mongoose')

const { Cart } = require('./CartSchema')

const ProductSchema = new mongoose.Schema({
    timestamp : {type: Date, default : new Date(), required: true },
    title: { type: String, required: true },
    description:{ type: String, required: true},
    code: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true},
    stock: { type: Number, required: true, default: 0 }    
})

ProductSchema.post('findOneAndDelete', async document => {
    const productId  = document._id
    await Cart.deleteMany({ product: productId })
})


module.exports = { 
     Product : mongoose.model('Product',ProductSchema),
     ProductSchema : ProductSchema }