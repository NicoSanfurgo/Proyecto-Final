const { User } = require('../../mongo/schemas/UserSchema')
const IUserDAO = require('./IUserDAO')
const UserDTO = require('../../DTOS/UserDTO')

class UserMongoDAO extends IUserDAO {
    static instance
    constructor(model, DTO){
        super()
        this.model = model
        this.DTO = DTO
        require('../../mongo/connection')
    }

    static getInstance(schema, dto){
        if(!this.instance) {
            this.instance = new UserMongoDAO(schema, dto)
        }
        return this.instance
    }
    
    async getById(id){
        const user = await this.model.findById(id).lean()
        if(!user ) return undefined
        const { _id, email, name, lastName, age, phone, avatar } = user
        
        return new this.DTO( _id, email, "", name, lastName, age, phone, avatar ).toJson()  
        
    }

    async getOneBy(objectParams, getPassword = false ){
        const user = await this.model.findOne(objectParams).lean()
        if(!user) return undefined

        const { _id, email, password, name, lastName, age, phone, avatar } = user
        if(getPassword){
            return new this.DTO( _id, email, password, name, lastName, age, phone, avatar ).toJson()  

        }else{
            return new this.DTO( _id, email, "", name, lastName, age, phone, avatar ).toJson()  
        }
    }

    async save(data){
        try{
            const { _id, email, name, lastName, age, phone, avatar } = await this.model.create(data)

            return  new this.DTO( _id, email, "", name, lastName, age, phone, avatar).toJson()  
        }catch(err){
            console.log(err)
            throw err
        }
        
    }

}

module.exports = UserMongoDAO.getInstance(User, UserDTO)