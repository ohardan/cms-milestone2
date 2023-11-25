class ConferencesManager {
  #organizers;
  #reviewers;
  #conferences;
  #venues;

  constructor() {
    if (ConferencesManager.instance == null) {
      this.#organizers = [];
      this.#reviewers = [];
      this.#conferences = [];
      this.#venues = [];
      ConferencesManager.instance = this;
    }
    return ConferencesManager.instance;
  }

  getOrganizers() {
    return this.#organizers;
  }
  getReviewers() {
    return this.#reviewers;
  }
  getConferences() {
    return this.#conferences;
  }
  getVenues() {
    return this.#venues;
  }

  addOrganizer(organizer) {
    this.#organizers.push(organizer);
  }
  addReviewer(reviewer) {
    this.#reviewers.push(reviewer);
  }
  addConference(conference) {
    this.#conferences.push(conference);
  }
  addVenue(venue) {
    this.#venues.push(venue);
  }

  conferenceExists(conference_name) {
    return this.#conferences.map((conf) => conf.name).includes(conference_name);
  }

  clear() {
    this.#organizers = [];
    this.#reviewers = [];
    this.#conferences = [];
    this.#venues = [];
  }
}

const cms = new ConferencesManager();
Object.freeze(cms);
export default cms;
