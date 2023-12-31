import Reviewer from "./reviewer.js";
import Venue from "./venue.js";
import { nanoid } from "nanoid";
import cms from "./conferences_manager.js";
import Organizer from "./organizer.js";

export default class Conference {
  #confCode;
  #organizer;
  #name;
  #dates = [];
  #reviewers = [];
  #venues = [];

  constructor(confCode, name) {
    this.confCode = confCode;
    this.name = name;
  }

  get confCode() {
    return this.#confCode;
  }

  get organizer() {
    return this.#organizer;
  }

  get name() {
    return this.#name;
  }

  get dates() {
    return this.#dates;
  }

  get reviewers() {
    return this.#reviewers;
  }

  get venues() {
    return this.#venues;
  }

  set confCode(confCode) {
    if (confCode === 0) this.#confCode = nanoid();
    else this.#confCode = confCode;
  }

  set organizer(value) {
    if (value instanceof Organizer) {
      this.#organizer = value;
      return true;
    }
    return false;
  }

  set name(name) {
    this.#name = name;
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

    dates.forEach((date) => {
      this.addDate(date);
    });
  }

  addReviewer(reviewer) {
    if (reviewer instanceof Reviewer) {
      this.#reviewers.push(reviewer);
      return true;
    } else {
      this.#reviewers.push(
        new Reviewer(
          reviewer.id,
          reviewer.name,
          reviewer.email,
          reviewer.password,
          reviewer.experties
        )
      );
      return true;
    }
  }

  addReviewers(reviewers) {
    if (reviewers instanceof Reviewer) {
      return this.addReviewer(reviewers);
    }

    if (!(reviewers instanceof Array)) {
      return false;
    }

    reviewers.forEach((reviewer) => {
      this.addReviewer(reviewer);
    });
  }

  addVenue(venue) {
    if (venue instanceof Venue) {
      this.#venues.push(venue);
      return true;
    } else {
      this.#venues.push(new Venue(venue.address));
      return true;
    }
  }

  addVenues(venues) {
    if (venues instanceof Venue) {
      return this.addVenue(venues);
    }

    if (!(venues instanceof Array)) {
      return false;
    }

    venues.forEach((venue) => {
      this.addVenue(venue);
    });
  }

  toJSON() {
    return {
      confCode: this.confCode,
      organizer: this.organizer.toJSON(),
      name: this.name,
      dates: this.dates.map((d) => d.toJSON()),
      reviewers: this.reviewers.map((r) => r.toJSON()),
      venues: this.venues.map((v) => v.toJSON()),
    };
  }
}
