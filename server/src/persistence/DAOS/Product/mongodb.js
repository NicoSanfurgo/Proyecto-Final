const { Product } = require('../../mongo/schemas/ProductSchema')
const ProductDTO = require('../../DTOS/ProductDTO')
const IProductDAO = require('./IProductDAO')
const ObjectId = require('mongoose').Types.ObjectId;

class ProductMongoDAO extends IProductDAO {

    static instance

    constructor(model, DTO){
        super()
        this.model = model
        this.DTO = DTO
        require('../../mongo/connection')
    }

    static getInstance(schema, dto){
        if(!this.instance) {
            this.instance = new ProductMongoDAO(schema, dto)
        }
        return this.instance
    }

    async getById(id){
        if(!ObjectId.isValid(id)) return undefined

        const product = await this.model.findById(id).lean();

        if(!product) return undefined 

        const  { _id, timestamp, title, description, code, thumbnail, price, stock }  = product;
        return  new this.DTO(_id, timestamp, title, description, code, thumbnail, price, stock ).toJson() 
    }

    async getOneBy(objectParams){

        if(!ObjectId.isValid(id)) return undefined

        const product = await this.model.findOne(objectParams)

        if(!product) return undefined

        const { _id, timestamp, title, description, code, thumbnail, price, stock }  = product
        return new this.DTO( _id, timestamp, title, description, code, thumbnail, price, stock ).toJson()
    }

    async getAll(){
        const data = await this.model.find().lean()
        return data.map( entity => 
             new this.DTO( 
                 entity._id, 
                 entity.timestamp, 
                 entity.title, 
                 entity.description, 
                 entity.code,
                 entity.thumbnail,
                 entity.price,
                 entity.stock  
                 ).toJson()
             )
    }

    async filter(objectData){
        const data = await this.model.find(objectData)
        if(!data) return []

        return data.map( entity => 
            new this.DTO( 
                entity._id, 
                entity.timestamp, 
                entity.title, 
                entity.description, 
                entity.code,
                entity.thumbnail,
                entity.price,
                entity.stock  
                ).toJson()
            )
    }

    async save(data){
        const {_id, timestamp, title, description, code, thumbnail, price, stock} = await this.model.create(data)
        return  new this.DTO( _id, timestamp, title, description, code, thumbnail, price, stock ).toJson()
    }

    async update(id, data){
        
        const updated  = await this.model.updateOne({ _id: id },{ $set: data })
        if(!updated) return undefined
        
        return this.getById(id)
        
    }

    async delete(id){
         const entity = await this.getById(id)
            
         if(!entity) return undefined
 
         await this.model.findOneAndDelete({ _id: id})

         return entity
       
    }
    
}

module.exports = ProductMongoDAO.getInstance(Product, ProductDTO)