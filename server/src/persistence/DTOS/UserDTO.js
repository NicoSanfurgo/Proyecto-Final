class UserDTO {
    #id
    #email
    #password
    #name
    #lastName
    #age
    #phone
    #avatar
   
    constructor( id, email, password, name, lastName, age, phone, avatar ) {
        this.#id = id;
        this.#email = email;
        this.#password = password;
        this.#name = name;
        this.#lastName = lastName;
        this.#age = age;
        this.#phone = phone;
        this.#avatar = avatar;
    }

    getId(){ return this.#id }
    getEmail() { return this.#email }
    getPassword() { return this.#password }
    getName() { return this.#name }
    getlastName() { return this.#lastName }
    getAge() { return this.#age }
    getPhone() { return this.#phone }
    getAvatar() { return this.#avatar }

    toJson(){
        return {
            id: this.#id,
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastName: this.#lastName,
            age: this.#age,
            phone: this.#phone,
            avatar: this.#avatar
        }
    }
}

module.exports = UserDTO;