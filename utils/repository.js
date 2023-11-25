import Conference from "@/public/model/conference";
import cms from "@/public/model/conferences_manager";
import Organizer from "@/public/model/organizer";
import Reviewer from "@/public/model/reviewer";
import Venue from "@/public/model/venue";
import * as cast from "@/utils/cast";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const ORGANIZERS_PATH = process.cwd() + "/data/organizers.json";
const REVIEWERS_PATH = process.cwd() + "/data/reviewers.json";
const CONFERENCES_PATH = process.cwd() + "/data/conferences.json";
const VENUES_PATH = process.cwd() + "/data/venues.json";

class Repository {
  constructor() {
    if (Repository.instance == null) {
      Repository.instance = this;
    }
    return Repository.instance;
  }

  async init() {
    try {
      cms.clear();
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

  async createOrganizer(name, email, password) {
    try {
      await this.init();
      const id = nanoid();
      const organizer = new Organizer(id, name, email, password);
      cms.addOrganizer(organizer);
      await fs.writeFile(ORGANIZERS_PATH, JSON.stringify(cms.getOrganizers()));
      return { error: 0, payload: organizer.toJSON() };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async #addConferenceID(organizerId, confCode) {
    try {
      // await this.init();
      const organizer = cms.getOrganizers().find((o) => o.id === organizerId);
      if (!organizer) {
        return { error: 2, message: "not found" };
      }
      organizer.addConferenceID(confCode);
      await fs.writeFile(ORGANIZERS_PATH, JSON.stringify(cms.getOrganizers()));
      return { error: 0, payload: organizer.toJSON() };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async authenticateOrganizer(email, password) {
    await this.init();
    try {
      let organizers = cms.getOrganizers();

      const organizer = organizers.find((o) => o.email === email);

      if (!organizer) {
        return { error: 2, message: "not found" };
      }

      if (organizer.isPassword(password)) {
        return {
          error: 0,
          payload: organizer.toJSON(),
        };
      }
    } catch (error) {
      return { error: 1, message: error.message };
    }
    return { error: 1, message: "invalid login" };
  }

  async createConference(conference) {
    try {
      await this.init();

      if (cms.conferenceExists(conference.name))
        return {
          error: 2,
          message: "Conference already exists, please change the name.",
        };

      const id = nanoid();
      const conf = new Conference(id, conference.name);

      const organizer = cms
        .getOrganizers()
        .find((o) => o.id === conference.organizerId);
      conf.organizer = organizer;
      await this.#addConferenceID(organizer.id, conf.confCode);

      conf.addDates(conference.dates.map((d) => new Date(d)));

      const venues = [];
      for (let v of conference.venues) {
        const result = await this.#createVenue(v.name, v.address);
        if (result.error === 0) {
          venues.push(result.payload);
        }
      }
      conf.addVenues(venues);

      const reviewers = [];
      for (let r of conference.reviewers) {
        const result = await this.#readReviewer(r.email);
        if (result.error === 0) {
          reviewers.push(result.payload);
        } else {
          const result2 = await this.#createReviewer(
            r.name,
            r.email,
            r.experties
          );

          if (result2.error === 0) {
            reviewers.push(result2.payload);
          } else if (result2.error === 2) {
            return result2;
          }
        }
      }

      conf.addReviewers(reviewers);

      conf.reviewers.forEach((r) => {
        this.#notifyReviewer(
          r.id,
          `You have been invited to review in ${conf.name}`
        );
      });

      cms.addConference(conf);

      const confs = cms.getConferences().map((c) => c.toJSON());
      await fs.writeFile(CONFERENCES_PATH, JSON.stringify(confs));
      return { error: 0, payload: conf.toJSON() };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async readConference(confCode) {
    await this.init();
    try {
      const conf = cms.getConferences().find((c) => c.confCode === confCode);
      if (conf) {
        return { error: 0, payload: conf.toJSON() };
      }
      return { error: 2, message: "not found" };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async readConferences(organizerId) {
    await this.init();
    try {
      let conferences = cms.getConferences();
      conferences = conferences.map((conf) => conf.toJSON());

      if (!organizerId) {
        return { error: 0, payload: conferences };
      }

      const organizer = cms.getOrganizers().find((o) => o.id === organizerId);
      if (organizer)
        return {
          error: 0,
          payload: conferences.filter((c) => c.organizer.id === organizerId),
        };

      return { error: 2, message: "organizer not found" };
    } catch (error) {
      return { error: 1, mesaage: error.message };
    }
  }

  async #createReviewer(name, email, expertise) {
    try {
      // await this.init();
      const id = nanoid();
      const reviewer = new Reviewer(id, name, email, "", expertise);
      cms.addReviewer(reviewer);
      await fs.writeFile(REVIEWERS_PATH, JSON.stringify(cms.getReviewers()));
      return { error: 0, payload: reviewer };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async #readReviewer(email) {
    try {
      // await this.init();
      const reviewer = cms.getReviewers().find((r) => r.email === email);
      if (reviewer) {
        return {
          error: 0,
          payload: reviewer,
        };
      }
      return { error: 2, message: "not found" };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async #notifyReviewer(reviewerId, message) {
    try {
      // await this.init();
      const reviewer = cms.getReviewers().find((r) => r.id === reviewerId);
      if (!reviewer) {
        return { error: 2, message: "not found" };
      }
      reviewer.notify(message);
      await fs.writeFile(REVIEWERS_PATH, JSON.stringify(cms.getReviewers()));
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async #createVenue(name, address) {
    try {
      // await this.init();
      const id = nanoid();
      const venue = new Venue(id, name, address);
      cms.addVenue(venue);
      await fs.writeFile(VENUES_PATH, JSON.stringify(cms.getVenues()));
      return { error: 0, payload: venue };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }
}

const repo = new Repository();
Object.freeze(repo);
export default repo;
