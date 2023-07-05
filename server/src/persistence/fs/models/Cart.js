const fsMngr = require ('../FsManager')
const productPersis =  require('./Product')

class Cart{

    constructor(path){
        this.path = path
    }

    async get(id){
        const cartItems = await fsMngr.getData(this.path)
        const cartProduct = cartItems.find(prod => prod.id === Number(id))
        
        return cartProduct
    }
    async getAll(){
        try{            
            const cartItems = await fsMngr.getData(this.path)
            return  cartItems
        }catch(err){
            return []
        }
    }

    async add(id_producto){

        const product = await productPersis.get(Number(id_producto))

        if( product == undefined || product == null ) return undefined
        
       const cartItem = { id: await fsMngr.getCurrentId(this.path) + 1 ,timestamp: Date.now(), product }
       const cartItems = [...await fsMngr.getData(this.path), cartItem]

       await fsMngr.saveInFile(this.path,cartItems,cartItem.id)

       return cartItem
    }

    async remove(id){

        let deletedItem

        let cartItems = await fsMngr.getData(this.path)

        cartItems = cartItems.filter(prod =>{
            if(prod.id !== Number(id) ){
                return prod
            }else{
                deletedItem = prod
            }
        } )

        await fsMngr.saveInFile(this.path,cartItems)
        return deletedItem
    }


}

module.exports = new Cart('carrito.txt')