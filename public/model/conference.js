class Conference {
    static #last_code = 0;
    #conf_code;
    #organizer
    #name
    #dates = []
    #reviewers = []
    #venues = []

    constructor(organizer, name, dates, reviewers, venues) {
        this.setOrganizer(organizer);
        this.setName(name);
        this.addDates(dates);
        this.addReviewers(reviewers);
        this.addVenues(venues);
        this.#organizer.addConference(this)
        this.#conf_code = ++Conference.#last_code;
    }

    getConfCode() {
        return this.#conf_code;
    }

    getName() {
        return this.#name;
    }

    setOrganizer(value) {
        if (value instanceof Organizer) {
            this.#organizer = value;
            return true;
        }
        return false;
    }

    setName(name) {
        if (ConferencesManager.conferenceExists(name)) {
            return false;
        }

        this.#name = name;
        return true;
    }

    addDate(date) {
        if (date instanceof Date) {
            this.#dates.push(date);
            return true;
        }
        return false;
    }

    addDates(dates) {
        if (dates instanceof Date) {
            return this.addDate(dates);
        }

        if (!(dates instanceof Array)) {
            return false;
        }
        
        
        this.#dates.push(...dates.filter(date => date instanceof Date));
    }

    addReviewer(reviewer) {
        if (reviewer instanceof Reviewer) {
            this.#reviewers.push(reviewer);
            return true;
        }
        return false;
    }

    addReviewers(reviewers) {
        if (reviewers instanceof Reviewer) {
            return this.addReviewer(reviewers)
        }

        if (!(reviewers instanceof Array)) {
            return false;
        }

        this.#reviewers.push(...reviewers.filter(reviewer => reviewer instanceof Reviewer));
    }

    addVenue(venue) {
        if (venue instanceof Venue) {
            this.#venues.push(venue);
            return true;
        }
        return false;
    }

    addVenues(venues) {
        if (venues instanceof Venue) {
            return this.addVenue(venues)
        }
        
        if (!(venues instanceof Array)) {
            return false;
        }

        this.#venues.push(...venues.filter(venue => venue instanceof Venue));
    }
}