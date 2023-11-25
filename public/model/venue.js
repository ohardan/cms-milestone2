export default class Venue {
  #venueId;
  #name;
  #address;

  constructor(venueId, name, address) {
    this.venueId = venueId;
    this.name = name;
    this.address = address;
  }

  get venueId() {
    return this.#venueId;
  }

  get name() {
    return this.#name;
  }

  get address() {
    return this.#address;
  }

  set venueId(value) {
    this.#venueId = value;
  }

  set name(value) {
    this.#name = value;
  }

  set address(value) {
    this.#address = value;
  }

  toJSON() {
    return {
      venueId: this.venueId,
      name: this.name,
      address: this.address,
    };
  }
}
