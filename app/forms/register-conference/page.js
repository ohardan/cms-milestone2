"use client";
import { createConferenceAction } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterConference() {
  const searchParams = useSearchParams();
  const organizerId = searchParams.get("organizerId");

  return (
    <main>
      <form
        action={createConferenceAction}
        className="">
        <input />
      </form>
    </main>
  );
}
