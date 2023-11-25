"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readConferencesAction } from "@/app/actions";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [conferences, setConferences] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      redirect("/forms/login");
    }
    setUser(user);
    readConferencesAction(user.id).then((result) => {
      if (result.error === 0) {
        setConferences(result.payload);
      }
    });
  }, []);

  return (
    <>
      <Link href={`/forms/register-conference?organizerId=${user?.id}`}>
        Register New Conference
      </Link>
      <p className="text-7xl">Dashboard</p>
      <Conferences conferences={conferences} />
    </>
  );
}

function Conferences({ conferences }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {conferences.map((conference) => (
        <Conference conference={conference} />
      ))}
    </div>
  );
}

function Conference({ conference }) {
  return <div>{conference.name}</div>;
}
