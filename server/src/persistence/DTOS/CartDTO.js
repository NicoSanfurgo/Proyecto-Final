class CartDTO {

    #id
    #timestamp
    #userId
    #product
    #quantity

    constructor(  id, timestamp, userId, product, quantity ) {
        this.#id = id;
        this.#timestamp = timestamp;
        this.#userId = userId;
        this.#product = product;
        this.#quantity = quantity;
      
    }

    getId(){ return this.#id }
    getTimestamp(){ return this.#timestamp }
    getUserId(){ return this.#userId }
    getProduct(){ return this.#product }
    getQuantity(){ return this.#quantity }
    

    toJson(){
        return {
            id: this.#id,
            timestamp: this.#timestamp,
            userId: this.#userId,
            product: this.#product,
            quantity: this.#quantity,
        }
    }
}

module.exports = CartDTO;