import { nanoid } from "nanoid";

export default class User {
  #id;
  #name;
  #email;
  #password;
  #notifications;

  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.#notifications = [];
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get email() {
    return this.#email;
  }
  get password() {
    return this.#password;
  }

  get notifications() {
    return this.#notifications;
  }

  set id(value) {
    if (value === 0) this.#id = nanoid();
    else this.#id = value;
  }
  set name(value) {
    this.#name = value;
  }
  set email(value) {
    this.#email = value;
  }
  set password(value) {
    this.#password = value;
  }

  set notifications(value) {
    this.#notifications = value;
  }

  isPassword(value) {
    return this.#password === value;
  }

  notify(message) {
    this.#notifications.push({ timestamp: new Date(), message: message });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      notifications: this.notifications,
    };
  }
}
