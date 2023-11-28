import { expect } from "chai";
import {
  castVenue,
  castOrganizer,
  castReviewer,
  castConference,
} from "../cast.js";
import Organizer from "../../public/model/organizer.js";
import Reviewer from "../../public/model/reviewer.js";
import Conference from "../../public/model/conference.js";
import Venue from "../../public/model/venue.js";

describe("Casting Functions", () => {
  it("should cast an object to a Venue instance", () => {
    const venueObject = {
      venueId: "1",
      name: "Venue 1",
      address: "123 Main St",
    };

    const venueInstance = castVenue(venueObject);

    expect(venueInstance).to.be.an.instanceOf(Venue);
    expect(venueInstance.venueId).to.equal(venueObject.venueId);
    expect(venueInstance.name).to.equal(venueObject.name);
    expect(venueInstance.address).to.equal(venueObject.address);
  });

  it("should cast an object to an Organizer instance", () => {
    const organizerObject = {
      id: "1",
      name: "Organizer 1",
      email: "organizer@example.com",
      password: "password123",
    };

    const organizerInstance = castOrganizer(organizerObject);

    expect(organizerInstance).to.be.an.instanceOf(Organizer);
    expect(organizerInstance.id).to.equal(organizerObject.id);
    expect(organizerInstance.name).to.equal(organizerObject.name);
    expect(organizerInstance.email).to.equal(organizerObject.email);
    expect(organizerInstance.password).to.equal(organizerObject.password);
  });

  it("should cast an object to a Reviewer instance", () => {
    const reviewerObject = {
      id: "2",
      name: "Reviewer 2",
      email: "reviewer@example.com",
      password: "password456",
      expertise: "Computer Science",
      notifications: [
        { timestamp: "2023-01-01T00:00:00:000Z", message: "New message" },
      ],
    };

    const reviewerInstance = castReviewer(reviewerObject);

    expect(reviewerInstance).to.be.an.instanceOf(Reviewer);
    expect(reviewerInstance.id).to.equal(reviewerObject.id);
    expect(reviewerInstance.name).to.equal(reviewerObject.name);
    expect(reviewerInstance.email).to.equal(reviewerObject.email);
    expect(reviewerInstance.password).to.equal(reviewerObject.password);
    expect(reviewerInstance.expertise).to.equal(reviewerObject.expertise);
    expect(reviewerInstance.notifications).to.deep.equal(
      reviewerObject.notifications
    );
  });

  it("should cast an object to a Conference instance", () => {
    const conferenceObject = {
      confCode: "conf123",
      name: "Conference Name",
    };

    const conferenceInstance = castConference(conferenceObject);

    expect(conferenceInstance).to.be.an.instanceOf(Conference);
    expect(conferenceInstance.confCode).to.equal(conferenceObject.confCode);
    expect(conferenceInstance.name).to.equal(conferenceObject.name);
  });
});
