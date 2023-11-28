import User from "./user.js";

export default class Reviewer extends User {
  #expertise;
  #papers;

  constructor(id, name, email, password, expertise) {
    super(id, name, email, password);
    this.expertise = expertise;
    this.#papers = [];
  }

  get expertise() {
    return this.#expertise;
  }

  get papers() {
    return this.#papers;
  }

  set expertise(value) {
    this.#expertise = value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      expertise: this.expertise,
      notifications: this.notifications,
    };
  }
}
