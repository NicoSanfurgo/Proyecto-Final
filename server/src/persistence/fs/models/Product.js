const fsMngr = require ('../FsManager')

class Product{ 
    constructor(path){
        this.path = path
    }

    async getAll(){
        
         const products = await fsMngr.getData(this.path)
         return products
      
    }

    async get(id){
        const products = await this.getAll()
        const product = products.find(prod => prod.id == Number(id))
        return product
    }
    
    async create(data){
        
            const product = { id : await fsMngr.getCurrentId(this.path) + 1 , timestamps: Date.now() ,...data } 
            const newProducts = [ ...await this.getAll(), product]

            await fsMngr.saveInFile(this.path,newProducts,product.id)
 
            return product
       
    }

    async update(id, data){
        let productUpdated; 
        let products = await this.getAll()
        let newProducts = products.map((prod)=>{
            if(prod.id == Number(id) ) {
                productUpdated = { ...prod, ...data}
                return productUpdated
            }
            return prod
        })

        await fsMngr.saveInFile(this.path,newProducts)

        return productUpdated
    }

    async remove(id){
        let deletedProduct
        let newProducts = await this.getAll()
        
        newProducts = newProducts.filter(prod =>{
            if(prod.id !== Number(id)){
                return prod
            }else{
                deletedProduct = prod
            }
        } )

        await fsMngr.saveInFile(this.path,newProducts)

        return deletedProduct
    }

}   

module.exports = new Product('productos.txt')