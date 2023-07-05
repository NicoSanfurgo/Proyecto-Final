class CartDTO {

    #id
    #timestamp
    #user
    #products
    #number
    #status

    constructor(  id, timestamp, user, products, number, status ) {
        this.#id = id;
        this.#timestamp = timestamp;
        this.#user = user;
        this.#products = products;
        this.#number = number;
        this.#status = status;
      
    }

    getId(){ return this.#id }
    getTimestamp(){ return this.#timestamp }
    getUser(){ return this.#user }
    getProducts(){ return this.#products }
    getStatus(){ return this.#status }
    

    toJson(){
        return {
            id: this.#id,
            timestamp: this.#timestamp,
            user: this.#user,
            products: this.#products,
            number: this.#number,
            status: this.#status,
        }
    }
}

module.exports = CartDTO;