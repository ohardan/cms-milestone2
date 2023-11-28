import { expect } from "chai";
import { nanoid } from "nanoid";
import Reviewer from "../reviewer.js";

describe("Reviewer", () => {
  it("should create a reviewer with the provided values", () => {
    const reviewerId = nanoid();
    const reviewer = new Reviewer(
      reviewerId,
      "Jane Doe",
      "jane@example.com",
      "password456",
      "Computer Science"
    );

    expect(reviewer.id).to.equal(reviewerId);
    expect(reviewer.name).to.equal("Jane Doe");
    expect(reviewer.email).to.equal("jane@example.com");
    expect(reviewer.password).to.equal("password456");
    expect(reviewer.expertise).to.equal("Computer Science");
    expect(reviewer.notifications).to.deep.equal([]);
    expect(reviewer.papers).to.deep.equal([]);
  });

  it("should set expertise to a new value using setter", () => {
    const reviewer = new Reviewer(
      nanoid(),
      "Jane Doe",
      "jane@example.com",
      "password456",
      "Computer Science"
    );

    reviewer.expertise = "Mathematics";

    expect(reviewer.expertise).to.equal("Mathematics");
  });

  it("should return a valid JSON representation", () => {
    const reviewerId = nanoid();
    const reviewer = new Reviewer(
      reviewerId,
      "Jane Doe",
      "jane@example.com",
      "password456",
      "Computer Science"
    );
    const json = reviewer.toJSON();

    expect(json).to.deep.equal({
      id: reviewerId,
      name: "Jane Doe",
      email: "jane@example.com",
      expertise: "Computer Science",
      notifications: [],
    });
  });
});
