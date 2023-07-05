const User = require('../persistence/PersistenceFactory')('User')
const Mail = require('../messaging/mail')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/AuthJWT')

class UserService{
    constructor(UserModel){
        this.UserModel = UserModel
    }

    async getById(id){
        return await this.UserModel.getById(id)
    }
    
    async getOneBy(data,withPass){
        return await this.UserModel.getOneBy(data,withPass)
    }

    async save(data){
        return await this.UserModel.save(data)
    }

    async login(email, password){
        try{ 
            let user = await this.UserModel.getOneBy( { email: email }, true )
            
            if(!user) return undefined 
                
            if( !bcrypt.compareSync(password, user.password) ) return undefined
                
            delete user.password

            const token = await generateToken(user)

            user.token = token 

            return user

        }catch(err){
            throw err
        }
       
    }
    async register(dataUser){
        const user = await this.UserModel.save(dataUser)
        await Mail.newRegister(user)
        
        delete user.password

        const token = await generateToken(user)

        user.token = token 

        return user
    }

}

module.exports = new UserService(User) 