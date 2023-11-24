import User from "./user";

export default class Reviewer extends User {
  #experties;
  #papers;

  constructor(id, name, email, password, experties) {
    super(id, name, email, password);
    this.experties = experties;
    this.#papers = [];
  }

  get experties() {
    return this.#experties;
  }

  get papers() {
    return this.#papers;
  }

  set experties(value) {
    this.#experties = value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      experties: this.experties,
    };
  }
}
