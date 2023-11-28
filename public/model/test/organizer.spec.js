import { expect } from "chai";
import { nanoid } from "nanoid";
import Organizer from "../organizer.js";

describe("Organizer", () => {
  it("should create an organizer with the provided values", () => {
    const organizerId = nanoid();
    const organizer = new Organizer(
      organizerId,
      "Organizer Name",
      "organizer@example.com",
      "password789"
    );

    expect(organizer.id).to.equal(organizerId);
    expect(organizer.name).to.equal("Organizer Name");
    expect(organizer.email).to.equal("organizer@example.com");
    expect(organizer.password).to.equal("password789");
    expect(organizer.conferencesIDs).to.deep.equal([]);
  });

  it("should return a valid JSON representation", () => {
    const organizerId = nanoid();
    const organizer = new Organizer(
      organizerId,
      "Organizer Name",
      "organizer@example.com",
      "password789"
    );
    const json = organizer.toJSON();

    expect(json).to.deep.equal({
      id: organizerId,
      name: "Organizer Name",
      email: "organizer@example.com",
      password: "password789",
      conferencesIDs: [],
    });
  });

  it("should add conference IDs correctly", () => {
    const organizer = new Organizer(
      nanoid(),
      "Organizer Name",
      "organizer@example.com",
      "password789"
    );

    organizer.addConferenceID("ConferenceID1");
    organizer.addConferenceID("ConferenceID2");

    expect(organizer.conferencesIDs).to.have.lengthOf(2);
    expect(organizer.conferencesIDs[0]).to.equal("ConferenceID1");
    expect(organizer.conferencesIDs[1]).to.equal("ConferenceID2");
  });

  it("should set conference IDs correctly", () => {
    const organizer = new Organizer(
      nanoid(),
      "Organizer Name",
      "organizer@example.com",
      "password789"
    );

    organizer.conferencesIDs = ["ConferenceID3", "ConferenceID4"];

    expect(organizer.conferencesIDs).to.have.lengthOf(2);
    expect(organizer.conferencesIDs[0]).to.equal("ConferenceID3");
    expect(organizer.conferencesIDs[1]).to.equal("ConferenceID4");
  });
});
