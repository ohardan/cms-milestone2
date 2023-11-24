import cms from "@/public/model/conferences_manager";
import * as cast from "@/utils/cast";
import { promises as fs } from "fs";

const ORGANIZERS_PATH = "data/organizers.json";
const REVIEWERS_PATH = "data/reviewers.json";
const CONFERENCES_PATH = "data/conferences.json";
const VENUES_PATH = "data/venues.json";

class Repository {
  constructor() {
    if (Repository.instance == null) {
      Repository.instance = this;
    }
    return Repository.instance;
  }

  async init() {
    try {
      const data4 = await fs.readFile(VENUES_PATH);
      const venues = JSON.parse(data4);
      venues.forEach((venue) => {
        cms.addVenue(cast.castVenue(venue));
      });

      const data = await fs.readFile(ORGANIZERS_PATH);
      const organizers = JSON.parse(data);
      organizers.forEach((organizer) => {
        cms.addOrganizer(cast.castOrganizer(organizer));
      });

      const data2 = await fs.readFile(REVIEWERS_PATH);
      const reviewers = JSON.parse(data2);
      reviewers.forEach((reviewer) => {
        cms.addReviewer(cast.castReviewer(reviewer));
      });

      const data3 = await fs.readFile(CONFERENCES_PATH);
      const conferences = JSON.parse(data3);
      conferences.forEach((conference) => {
        const conf = cast.castConference(conference);
        conf.organizer = cms
          .getOrganizers()
          .find((o) => o.id === conference.organizer.id);
        conf.addDates(conference.dates.map((d) => new Date(d)));
        conf.addReviewers(
          cms
            .getReviewers()
            .filter((r) =>
              conference.reviewers.map((r2) => r2.id).includes(r.id)
            )
        );
        conf.addVenues(
          cms
            .getVenues()
            .filter((v) =>
              conference.venues.map((v2) => v2.venueId).includes(v.venueId)
            )
        );
        cms.addConference(conf);
      });

      cms.getConferences().forEach((conf) => {
        cms
          .getOrganizers()
          .find((o) => o.id === conf.organizer.id)
          .addConferenceID(conf.confCode);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async authenticateOrganizer(email, password) {
    try {
      let organizers = cms.getOrganizers();

      const organizer = organizers.find((o) => o.email === email);

      if (!organizer) {
        return { error: 2, message: "not found" };
      }

      if (organizer.isPassword(password)) {
        return {
          error: 0,
          payload: {
            id: organizer.id,
            name: organizer.name,
            email: organizer.email,
          },
        };
      }
    } catch (error) {
      return { error: 1, message: "data error" };
    }
    return { error: 1, message: "invalid login" };
  }
}

const repo = new Repository();
Object.freeze(repo);
export default repo;
