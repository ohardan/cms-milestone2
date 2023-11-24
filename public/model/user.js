class User {
    #name
    #email
    #password

    constructor(name, email, password) {
        this.setName(name);
        this.setEmail(email);
        this.#setPassword(password);
    }

    getName() { return this.#name }
    getEmail() { return this.#email }

    setName(value) {
        if (value instanceof String) {
            this.#name = value;
            return true;
        }
        return false;
    }
    
    setEmail(value) {
        if (value instanceof String && isEmail(value)) {
            this.#email = value;
            return true;
        }
        return false;
    }
    
    #setPassword(value) {
        if (value instanceof String) {
            this.#password = value;
            return true;
        }
        return false;
    }

    isPassword(value) {
        return this.#password === value;
    }

    notify(title, message) {
        if (!(title instanceof String && message instanceof String))
            return false;

        // TODO: Send email; Needs HTML to be done probably.
    }

    static isEmail(str) {
        const atIndex = str.indexOf("@");
        const dotIndex = str.lastIndexOf(".");
        return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < str.length - 1;
    }
}