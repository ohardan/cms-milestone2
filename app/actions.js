"use server";
import repo from "@/utils/repository";

export async function loginAction(formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  return await repo.authenticateOrganizer(email, password);
}

export async function createConferenceAction(formdata) {
  console.log(formdata);
}

export async function readConferencesAction(organizerID) {
  return await repo.readConferences(organizerID);
}
