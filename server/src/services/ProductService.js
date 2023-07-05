const model = require('../persistence/PersistenceFactory')('Product')

class ProductService {
    constructor(model){
       this.model = model
    }

    async getById(id){
        return await this.model.getById(id)
    }

    async getAll(){
        return await this.model.getAll()   
    }
    async save(data){
       return await this.model.save(data)
    }

    async update(id, data){
        return await this.model.update(id,data)        
    }
    async delete(id){
       return await this.model.delete(id)
    }
    async filter(dataObject){
        return await this.model.filter(dataObject)
     }
}


module.exports = new ProductService(model)