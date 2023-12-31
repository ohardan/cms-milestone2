import Organizer from "../public/model/organizer.js";
import Reviewer from "../public/model/reviewer.js";
import Conference from "../public/model/conference.js";
import Venue from "../public/model/venue.js";

export function castVenue(object) {
  return new Venue(object.venueId, object.name, object.address);
}

export function castOrganizer(object) {
  const organizer = new Organizer(
    object.id,
    object.name,
    object.email,
    object.password
  );

  return organizer;
}

export function castReviewer(object) {
  const reviewer = new Reviewer(
    object.id,
    object.name,
    object.email,
    object.password,
    object.expertise
  );
  reviewer.notifications = object.notifications;

  return reviewer;
}

export function castConference(object) {
  const conference = new Conference(object.confCode, object.name);

  return conference;
}
