const options = require('./config')
const Persistence = require('../Persistence')

class MySqlPersistence extends Persistence{
    constructor(){
        super()
    }
     connectDB(){
        console.log(`Connected using client ${options.client} `)
        return false
    }

    getModel(modelName){
        
        return require(`./models/${modelName}`)
    }
}


module.exports = new MySqlPersistence()