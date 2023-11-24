class Venue {
    #address

    constructor(address) {
        this.setAddress(address);
    }

    getAddress() {
        return this.#address;
    }

    setAddress(value) {
        if (value instanceof String) {
            this.#address = value;
            return true;
        }
        return false;
    }
}