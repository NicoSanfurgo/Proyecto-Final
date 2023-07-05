const jwt = require('jsonwebtoken')
const { SECRETJWT } = require('../config')

module.exports = {
    generateToken: (user) => {
        return new Promise((resolve, reject) => {
             jwt.sign({ data: user }, SECRETJWT, { expiresIn: '10m' }, (err, token) =>{
                if( err ) return reject(err)
                return resolve (token)
            });
        }) 
        },

    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRETJWT, (err, data) => {
                if (err) return reject(err)
                return resolve(data.data)
            });
        })
       
    }
}