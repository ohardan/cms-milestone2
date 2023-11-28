import Venue from "../venue.js";
import { expect } from "chai";

describe('Venue', () => {
  it('should create a venue with the provided values', () => {
    const venue = new Venue(123456, 'Example Venue', '123 Main St');

    expect(venue.venueId).to.equal(123456);
    expect(venue.name).to.equal('Example Venue');
    expect(venue.address).to.equal('123 Main St');
  });

  it('should set new values using setters', () => {
    const venue = new Venue(1, 'Example Venue', '123 Main St');

    venue.venueId = 234567;
    venue.name = 'Updated Venue';
    venue.address = '456 New St';

    expect(venue.venueId).to.equal(234567);
    expect(venue.name).to.equal('Updated Venue');
    expect(venue.address).to.equal('456 New St');
  });

  it('should return a valid JSON representation', () => {
    const venue = new Venue(1, 'Example Venue', '123 Main St');
    const json = venue.toJSON();

    expect(json).to.deep.equal({
      venueId: 1,
      name: 'Example Venue',
      address: '123 Main St',
    });
  });
});
