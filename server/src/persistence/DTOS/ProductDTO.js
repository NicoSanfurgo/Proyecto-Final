class ProductDTO {

    #id
    #timestamp
    #title
    #description
    #code
    #thumbnail
    #price
    #stock

    constructor(  id, timestamp, title, description, code, thumbnail, price, stock  ) {
        this.#id = id;
        this.#timestamp = timestamp;
        this.#title = title;
        this.#description = description;
        this.#code = code;
        this.#thumbnail = thumbnail;
        this.#price = price;
        this.#stock = stock;
    }

    getId(){ return this.#id }
    getTimestamp(){ return this.#timestamp }
    getTitle(){ return this.#title }
    getDescription(){ return this.#description }
    getCode(){ return this.#code }
    getThumbnail(){ return this.#thumbnail }
    getPrice(){ return this.#price }
    getStock(){ return this.#stock }

    toJson(){
        return {
            id: this.#id,
            timestamp: this.#timestamp,
            title: this.#title,
            description: this.#description,
            code: this.#code,
            thumbnail: this.#thumbnail,
            price: this.#price,
            stock: this.#stock
        }
    }
}

module.exports = ProductDTO;