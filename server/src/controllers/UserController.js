const UserService = require('../services/UserService')
const fs = require('fs')
const logger = require('../logger')

class UserController{
    constructor(){
    }

    async login( req, res ){
        try{
            const { email, password } = req.body 

            let user = await UserService.login( email, password )
            
            if(!user) return res.status(400).json({ message: 'Invalid Credentials'})

            return res.json({ user: user })

        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }   
        
    }

    async signup( req, res ){
        try{
            const data = req.body
            
            let user = await UserService.getOneBy({email: data.email})

            if (!req.file) return res.status(403).json({error: "No se envio una imagen"})
            
            if (user){
                fs.unlink(req.file.path, (err) => {
                    if(err) logger.error(err)
                    return 
                })
                return res.status(403).json({error: "El usuario ya existe"}) 
            }
            
            
            const dataUser = {
                    email : data.email,
                    password : data.password,
                    name : data.name,
                    lastName : data.lastName,
                    age : data.age,
                    phone :data.phone,
                    avatar :req.file.path
                }

                
            user = await UserService.register(dataUser)
            
            return res.status(201).json({ message: 'User Registered', user: user })

        }catch(err){
            return res.status(500).json({error: 'Ha ocurrido un error'})
        }
    }
}



module.exports = new UserController()