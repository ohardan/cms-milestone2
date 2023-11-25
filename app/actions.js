"use server";
import repo from "@/utils/repository";

export async function loginAction(formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  return await repo.authenticateOrganizer(email, password);
}

export async function registerAction(formdata) {
  const name = formdata.get("name");
  const email = formdata.get("email");
  const password = formdata.get("password");
  return await repo.createOrganizer(name, email, password);
}

export async function createConferenceAction(formdata) {
  const conference = {
    name: formdata.get("conferenceName"),
    organizerId: formdata.get("organizerId"),
    dates: [],
    venues: [],
    reviewers: [],
  };

  const datesCount = Number(formdata.get("datesCount"));
  const venuesCount = Number(formdata.get("venuesCount"));
  const reviewersCount = Number(formdata.get("reviewersCount"));

  for (let i = 0; i < datesCount; i++) {
    const date = formdata.get(`date${i}`) + "T00:00:00.000Z";
    conference.dates.push(date);
  }

  for (let i = 0; i < venuesCount; i++) {
    const venue = {
      name: formdata.get(`venueName${i}`),
      address: formdata.get(`venueAddress${i}`),
    };
    conference.venues.push(venue);
  }

  for (let i = 0; i < reviewersCount; i++) {
    const reviewer = {
      name: formdata.get(`reviewerName${i}`),
      email: formdata.get(`reviewerEmail${i}`),
      experties: formdata.get(`reviewerExperties${i}`),
    };
    conference.reviewers.push(reviewer);
  }

  return await repo.createConference(conference);
}

export async function readConferencesAction(organizerID) {
  return await repo.readConferences(organizerID);
}
