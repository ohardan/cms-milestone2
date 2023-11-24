class Reviewer extends User {
    #experties;
    #papers = [];

    constructor(experties) {
        this.setExperties(experties);
    }

    getExperties(experties) {
        return this.#experties;
    }

    setExperties(experties) {
        if (experties instanceof String) {
            this.#experties = experties;
            return true;
        }
        return false;
    }
}