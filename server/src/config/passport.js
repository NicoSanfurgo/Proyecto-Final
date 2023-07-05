const LocalStrategy = require('passport-local').Strategy
const UserService = require('../services/UserService')

const logger = require('../logger')
const fs = require('fs')

module.exports = ( passport ) => {

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(async function (id, done) {
        try{
            const user = await UserService.getById(id)
            if(user == undefined) return done(null, false)
            done(null ,user)
        }catch(err){
            done(err,null)
        }
    
    })

    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },  async (req, email, password, done) => {
            try{
                let user = await UserService.getOneBy({email: email})
                if (user){
                    fs.unlink(req.file.path, (err) => {
                        if(err) logger.error(err)
                        return 
                    })
                    return done( null, false, logger.info("User Already Exists"))
                } 

                if (!req.file) return done( null, false, logger.info("No se envio una imagen"))
                
                const data = req.body
                
                const dataUser = {
                    email : data.email,
                    password : data.password,
                    name : data.name,
                    lastName : data.lastName,
                    age :data.age,
                    phone :data.phone,
                    avatar :req.file.path
                }

                user = await UserService.register(dataUser)
                return done(null, user)
            }catch(err){
                logger.info(err)
                done(err)
            }
        }
        )
    )

    passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        async (req,email,password,done) => {

            try{   
                let user = await UserService.login(email, password)

                if(!user) return done( null, false, logger.info("Invalid Credentials") )
               
                return done(null, user)
            }catch(err){
                done(err)
            }
        }
    )
    )
}