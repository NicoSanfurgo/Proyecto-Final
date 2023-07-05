const {knex} = require ('../knex')

class Cart{

    constructor(){
    }

    async get(cartId){
        const cartProduct = await knex
            .from('carritos')
            .join('productos','productos.id','carritos.id_producto')
            .select('carritos.id as carrito_id', 'carritos.timestamp')
            .select( 'productos.id',
                     'productos.nombre',
                     'productos.descripcion',
                     'productos.codigo',
                     'productos.precio',
                     'productos.foto')
            .where('carritos.carrito_id',1)
            .where('carritos.id',cartId)
    
        const { carrito_id, timestamp , ...producto } = cartProduct[0]
        const cartItem = { id: carrito_id, timestamp, producto }

        return cartItem
    }
    async getAll(){
    
         const query = await knex
                .from('carritos')
                .join('productos','productos.id','carritos.id_producto')
                .select('carritos.id as carrito_id', 'carritos.timestamp')
                .select( 'productos.id ',
                        'productos.nombre',
                        'productos.descripcion',
                        'productos.codigo',
                        'productos.precio',
                        'productos.foto')
                .where('carritos.carrito_id',1)

        const cartItems = query.map( ele => {
            const   { carrito_id, timestamp , ...producto } = ele
            return { id: carrito_id, timestamp, producto }
        })
        return  cartItems
     
    }

    async add(id_producto){

        const exists = await knex('productos').where('id',id_producto).limit(1)

        if(exists[0] == undefined ) return undefined
        
        const idCartItem = await knex('carritos').insert({id_producto: id_producto})

        const cartItem = await this.get(idCartItem)

        return cartItem
    }

    async remove(id){
        const deletedCartProduct = await this.get(id)
        const deleted = await knex('carritos').where('id', id).del()

        if(!deleted) return undefined

        return deletedCartProduct
    }


}

module.exports = new Cart()