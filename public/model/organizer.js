import User from "./user.js";

export default class Organizer extends User {
  #conferencesIDs;

  constructor(id, name, email, password) {
    super(id, name, email, password);
    this.#conferencesIDs = [];
  }

  get conferencesIDs() {
    return this.#conferencesIDs;
  }

  set conferencesIDs(value) {
    this.#conferencesIDs = value;
  }

  addConferenceID(conference) {
    this.#conferencesIDs.push(conference);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      conferencesIDs: this.conferencesIDs,
    };
  }
}
