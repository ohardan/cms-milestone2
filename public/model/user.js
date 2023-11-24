import { nanoid } from "nanoid";

export default class User {
  #id;
  #name;
  #email;
  #password;

  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
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

  set id(value) {
    if (value === 0) this.#id = nanoid();
    else this.#id = value;
  }
  set name(value) {
    this.#name = value;
  }
  set email(value) {
    if (User.isEmail(value)) {
      this.#email = value;
    } else {
      throw new Error("email must be a valid email address");
    }
  }
  set password(value) {
    this.#password = value;
  }

  isPassword(value) {
    return this.#password === value;
  }

  notify() {
    // send email to this.#email
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  static isEmail(str) {
    const atIndex = str.indexOf("@");
    const dotIndex = str.lastIndexOf(".");
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < str.length - 1;
  }
}
