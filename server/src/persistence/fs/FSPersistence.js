const Persistence = require('../Persistence')

class FSPersistence extends Persistence {
    constructor(){
        super()
    }

    connectDB(){
        console.log(`Persistiendo datos en File System`)
        return false
    }

    getModel(modelName){
        
        return require(`./models/${modelName}`)
    }
}


module.exports = new FSPersistence()