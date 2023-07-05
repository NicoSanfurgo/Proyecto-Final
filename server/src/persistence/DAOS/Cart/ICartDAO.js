module.exports = class ICartDAO{
    constructor(){}
    
    async get(id, userId){
        throw new Error('Cart - get not Implemented')
    }
    async getAll(userId){
        throw new Error('Cart - getAll not Implemented')
    }

    async add(id_producto, quantity, userId){

        throw new Error('Cart - add not Implemented')
    }

    async update(id, data, userId){

        throw new Error('Cart - update not Implemented')
    }

    async remove(id, userId ){
        throw new Error('Cart - remove not Implemented')
    }

}