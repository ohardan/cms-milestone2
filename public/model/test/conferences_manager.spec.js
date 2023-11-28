import { expect } from "chai";
import { ConferencesManager } from "../conferences_manager.js";
import Organizer from "../organizer.js";
import Reviewer from "../reviewer.js";
import Conference from "../conference.js";
import Venue from "../venue.js";
import { nanoid } from "nanoid";

describe("ConferencesManager", () => {
  beforeEach(() => {
    ConferencesManager.instance = null;
  });

  it("should be a singleton", () => {
    const cm1 = new ConferencesManager();
    const cm2 = new ConferencesManager();

    expect(cm1).to.equal(cm2);
  });

  it("should add organizers, reviewers, conferences, and venues correctly", () => {
    const cm = new ConferencesManager();

    const organizer = new Organizer(
      "1",
      "Organizer",
      "organizer@example.com",
      "password123"
    );
    const reviewer = new Reviewer(
      "2",
      "Reviewer",
      "reviewer@example.com",
      "password456",
      "Computer Science"
    );
    const conference = new Conference(
      "Conference Name",
      "2023-01-01",
      "2023-01-03",
      "1"
    );
    const venue = new Venue("1", "Venue Name", "123 Main St");

    cm.addOrganizer(organizer);
    cm.addReviewer(reviewer);
    cm.addConference(conference);
    cm.addVenue(venue);

    expect(cm.getOrganizers()).to.deep.equal([organizer]);
    expect(cm.getReviewers()).to.deep.equal([reviewer]);
    expect(cm.getConferences()).to.deep.equal([conference]);
    expect(cm.getVenues()).to.deep.equal([venue]);
  });

  it("should check if a conference exists correctly", () => {
    const cm = new ConferencesManager();

    const conference = new Conference(nanoid(), "Conference Name");
    cm.addConference(conference);

    expect(cm.conferenceExists("Conference Name")).to.be.true;
    expect(cm.conferenceExists("Nonexistent Conference")).to.be.false;
  });

  it("should clear all data correctly", () => {
    const cm = new ConferencesManager();

    const organizer = new Organizer(
      nanoid(),
      "Organizer",
      "organizer@example.com",
      "password123"
    );
    const reviewer = new Reviewer(
      nanoid(),
      "Reviewer",
      "reviewer@example.com",
      "password456",
      "Computer Science"
    );
    const conference = new Conference(nanoid(), "Conference Name");
    const venue = new Venue(nanoid(), "Venue Name", "123 Main St");

    cm.addOrganizer(organizer);
    cm.addReviewer(reviewer);
    cm.addConference(conference);
    cm.addVenue(venue);

    cm.clear();

    expect(cm.getOrganizers()).to.deep.equal([]);
    expect(cm.getReviewers()).to.deep.equal([]);
    expect(cm.getConferences()).to.deep.equal([]);
    expect(cm.getVenues()).to.deep.equal([]);
  });
});
