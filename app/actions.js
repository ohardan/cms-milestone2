"use server";
import repo from "@/utils/repository";
import { redirect } from "next/navigation";

export async function initAction() {
  await repo.init();
}

export async function loginAction(formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  return await repo.authenticateOrganizer(email, password);
}

export async function readConferencesAction(organizerID) {}

export async function createConferenceAction(formdata) {}
