const {knex} = require ('../knex')

class Product{ 
    constructor(){
       
    }

    async getAll(){
        const products = await knex.from('productos').select('*')

         return products
      
    }

    async get(id){
        const product = await knex.from('productos').select('*').where('id',Number(id))
        return product[0]
    }
    
    async create(data){
        const idProduct = await knex('productos').insert(data)
        const product = await this.get(idProduct)
        return product
       
    }

    async update(id, data){

        const updated = await knex('productos').where('id',id).update(data)

        if(!updated) return undefined

        return await this.get(id)
    }

    async remove(id){
        const product = await this.get(id)
        const deleted = await knex('productos').where('id', id).del()

        if(!deleted) return undefined

        return product
    }

    async filter(data){

        const products = await knex.from('productos').select('*').where(data)

        return products
    }
}   

module.exports = new Product()
