import { expect } from "chai";
import { nanoid } from "nanoid";
import Conference from "../conference.js";
import Organizer from "../organizer.js";
import Reviewer from "../reviewer.js";
import Venue from "../venue.js";

describe("Conference", () => {
  it("should create a conference with the provided values", () => {
    const confCode = nanoid();
    const organizer = new Organizer(
      nanoid(),
      "Organizer",
      "organizer@example.com",
      "password123"
    );
    const conference = new Conference(confCode, "Conference Name");

    conference.organizer = organizer;
    conference.addDate(new Date("2023-01-01"));
    conference.addReviewer(
      new Reviewer(
        "2",
        "Reviewer",
        "reviewer@example.com",
        "password456",
        "Computer Science"
      )
    );
    conference.addVenue(new Venue("Venue Address"));

    expect(conference.confCode).to.equal(confCode);
    expect(conference.organizer).to.equal(organizer);
    expect(conference.name).to.equal("Conference Name");
    expect(conference.dates).to.have.lengthOf(1);
    expect(conference.reviewers).to.have.lengthOf(1);
    expect(conference.venues).to.have.lengthOf(1);
  });

  it("should add multiple dates correctly", () => {
    const conference = new Conference(nanoid(), "Conference Name");

    const datesToAdd = [
      new Date("2023-01-01"),
      new Date("2023-01-02"),
      new Date("2023-01-03"),
    ];
    conference.addDates(datesToAdd);

    expect(conference.dates).to.have.lengthOf(3);
  });

  it("should add multiple reviewers correctly", () => {
    const conference = new Conference(nanoid(), "Conference Name");

    const reviewersToAdd = [
      new Reviewer(
        nanoid(),
        "Reviewer 1",
        "reviewer1@example.com",
        "password123",
        "Field 1"
      ),
      new Reviewer(
        nanoid(),
        "Reviewer 2",
        "reviewer2@example.com",
        "password456",
        "Field 2"
      ),
    ];

    conference.addReviewers(reviewersToAdd);

    expect(conference.reviewers).to.have.lengthOf(2);
  });

  it("should add multiple venues correctly", () => {
    const conference = new Conference(nanoid(), "Conference Name");

    const venuesToAdd = [
      new Venue(nanoid(), "Venue 1", "Venue 1 Address"),
      new Venue(nanoid(), "Venue 2", "Venue 2 Address"),
    ];
    conference.addVenues(venuesToAdd);

    expect(conference.venues).to.have.lengthOf(2);
  });

  it("should return a valid JSON representation", () => {
    const confCode = nanoid();
    const organizerId = nanoid();
    const organizer = new Organizer(
      organizerId,
      "Organizer",
      "organizer@example.com",
      "password123"
    );
    const conference = new Conference(confCode, "Conference Name");

    conference.organizer = organizer;
    conference.addDate(new Date("2023-01-01"));
    const reviewerId = nanoid();
    conference.addReviewer(
      new Reviewer(
        reviewerId,
        "Reviewer",
        "reviewer@example.com",
        "password456",
        "Computer Science"
      )
    );
    const venueId = nanoid();
    conference.addVenue(new Venue(venueId, "Venue", "Venue Address"));

    const json = conference.toJSON();

    expect(json).to.deep.equal({
      confCode: confCode,
      organizer: new Organizer(
        organizerId,
        "Organizer",
        "organizer@example.com",
        "password123"
      ).toJSON(),
      name: "Conference Name",
      dates: [new Date("2023-01-01").toJSON()],
      reviewers: [
        new Reviewer(
          reviewerId,
          "Reviewer",
          "reviewer@example.com",
          "password456",
          "Computer Science"
        ).toJSON(),
      ],
      venues: [new Venue(venueId, "Venue", "Venue Address").toJSON()],
    });
  });
});
