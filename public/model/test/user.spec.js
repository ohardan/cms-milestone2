import chai, { expect } from "chai";
import { nanoid } from "nanoid";
import chaiDateTime from "chai-datetime";
chai.use(chaiDateTime);
import User from "../user.js";

describe("User", () => {
  it("should create a user with the provided values", () => {
    const userId = nanoid();
    const user = new User(
      userId,
      "John Doe",
      "john@example.com",
      "password123"
    );

    expect(user.id).to.equal(userId);
    expect(user.name).to.equal("John Doe");
    expect(user.email).to.equal("john@example.com");
    expect(user.password).to.equal("password123");
    expect(user.notifications).to.deep.equal([]);
  });

  it("should set a new ID if the provided ID is 0", () => {
    const user = new User(0, "John Doe", "john@example.com", "password123");

    expect(user.id).to.be.a("string");
    expect(user.name).to.equal("John Doe");
    expect(user.email).to.equal("john@example.com");
    expect(user.password).to.equal("password123");
    expect(user.notifications).to.deep.equal([]);
  });

  it("should validate the password correctly", () => {
    const user = new User(
      nanoid(),
      "John Doe",
      "john@example.com",
      "password123"
    );

    expect(user.isPassword("password123")).to.be.true;
    expect(user.isPassword("wrongpassword")).to.be.false;
  });

  it("should add notifications correctly", () => {
    const user = new User(
      nanoid(),
      "John Doe",
      "john@example.com",
      "password123"
    );

    const timestamp = new Date();
    user.notify("New message 1");
    user.notify("New message 2");

    expect(user.notifications).to.have.lengthOf(2);
    expect(user.notifications[0]).to.have.property("message", "New message 1");
    expect(user.notifications[0])
      .to.have.property("timestamp")
      .to.afterOrEqualDate(timestamp)
      .and.to.afterOrEqualTime(timestamp);
    expect(user.notifications[1]).to.have.property("message", "New message 2");
    expect(user.notifications[1])
      .to.have.property("timestamp")
      .to.afterOrEqualDate(timestamp)
      .and.to.afterOrEqualTime(timestamp);
  });

  it("should return a valid JSON representation", () => {
    const userId = nanoid();
    const user = new User(
      userId,
      "John Doe",
      "john@example.com",
      "password123"
    );
    const json = user.toJSON();

    expect(json).to.deep.equal({
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      notifications: [],
    });
  });
});
