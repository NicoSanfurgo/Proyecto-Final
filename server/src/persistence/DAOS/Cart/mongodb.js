const { Cart } = require('../../mongo/schemas/CartSchema')
const { Product } = require('../../mongo/schemas/ProductSchema')
const ICartDAO = require('./ICartDAO')
const CartDTO = require('../../DTOS/CartDTO')
const ProductDTO = require('../../DTOS/ProductDTO')
const ObjectId = require('mongoose').Types.ObjectId;

class CartMongoDAO extends ICartDAO {

    constructor( Cart, Product, DTO, ProductDTO ){
        super()
        this.CartModel = Cart
        this.ProductModel = Product
        this.DTO = DTO
        this.ProductDTO = ProductDTO

        require('../../mongo/connection')
    }
    
    async get(id, user_id){

        if(!ObjectId.isValid(id)) return undefined

        const cartItem =await this.CartModel.findOne({ _id:id, user: user_id}).populate('product').lean()
        if(!cartItem) return undefined

        return  new this.DTO( 
            cartItem._id,
            cartItem.timestamp,
            cartItem.user,
            new this.ProductDTO(
                cartItem.product._id,
                cartItem.product.timestamp,
                cartItem.product.title,
                cartItem.product.description,
                cartItem.product.code,
                cartItem.product.thumbnail,
                cartItem.product.price,
                cartItem.product.stock).toJson(),
            cartItem.quantity
            ).toJson()
    }

    async getAll(user_id){
        const data = await this.CartModel.find({user: user_id}).populate('product').lean()
        return data.map( cartItem =>
            new this.DTO( 
                cartItem._id,
                cartItem.timestamp,
                cartItem.user,
                new this.ProductDTO(
                    cartItem.product._id,
                    cartItem.product.timestamp,
                    cartItem.product.title,
                    cartItem.product.description,
                    cartItem.product.code,
                    cartItem.product.thumbnail,
                    cartItem.product.price,
                    cartItem.product.stock).toJson(),
                cartItem.quantity
                ).toJson()
            )
    }

    async add(id_producto, quantitySetted , user_id){

       
        const productData = await this.ProductModel.findById(id_producto)
        
        if(await this.#isProductInCart(id_producto, user_id)) return undefined 
        
        if( productData == undefined ) return undefined

        const newCart  = await this.CartModel.create({ product: id_producto, user: user_id, quantity : quantitySetted })

        const { _id, timestamp, user, product, quantity } = await newCart.populate('product').execPopulate()
        
        const productDTO =  new this.ProductDTO(
            product._id,
            product.timestamp,
            product.title,
            product.description,
            product.code,
            product.thumbnail,
            product.price,
            product.stock).toJson()

        return new this.DTO(_id, timestamp, user, productDTO, quantity).toJson()
    }
    
    async #isProductInCart(id_producto, user_id){
        const res = await this.CartModel.findOne({ product:id_producto, user: user_id})
        if(res == undefined ) return false
        return res 
    }

    async update(id, data, user_id){
        const updated  = await this.CartModel.updateOne({ _id: id, user: user_id },{ $set: data })
        if(!updated) return undefined
        
        return await this.get(id, user_id)
    }

    async remove(id, user_id ){
        const deletedItem = await this.CartModel.findOneAndDelete({_id:id, user: user_id}).populate('product')

        if(!deletedItem) return undefined

        const { _id, timestamp, userId, product, quantity } = deletedItem

        const productDTO =  new this.ProductDTO(
            product._id,
            product.timestamp,
            product.title,
            product.description,
            product.code,
            product.thumbnail,
            product.price,
            product.stock).toJson()

        return new this.DTO(_id, timestamp, userId, productDTO, quantity).toJson()
    }

}

module.exports = new CartMongoDAO( Cart, Product,CartDTO, ProductDTO)