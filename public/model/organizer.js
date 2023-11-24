class Organizer extends User {
    #conferences = []

    getConferences() {
        return this.#conferences;
    }

    addConference(value) {
        if (value instanceof Conference) {
            this.#conferences.push(value)
        }
    }
}