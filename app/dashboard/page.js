"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readConferencesAction } from "@/app/actions";
import { redirect, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const params = useSearchParams();
  const alert = params.get("alert");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
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
    if (alert) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 1500);
    }
  }, []);

  return (
    <main className="flex flex-col items-center gap-6 m-12">
      <h1 className="text-5xl">Dashboard</h1>
      <p
        className={`bg-green-600 bg-opacity-20 p-4 rounded-md border-green-400 border w-[500px] ${
          !isAlertVisible ? "hidden" : ""
        }`}>
        Conference Created Successfully!
      </p>
      <div className=" flex justify-between items-center w-full p-4">
        <h2 className="text-3xl">My Conferences:</h2>
        <Link
          href="/forms/register-conference"
          className="text-xl border-2 px-3 py-1 bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-slate-200 transition-colors duration-100 cursor-pointer">
          Register Conference
        </Link>
      </div>
      <Conferences conferences={conferences} />
    </main>
  );
}

function Conferences({ conferences }) {
  return (
    <div className="flex flex-col gap-4">
      {conferences.map((conference, index) => (
        <Conference
          conference={conference}
          key={index}
        />
      ))}
    </div>
  );
}

function Conference({ conference }) {
  return (
    <div className="flex flex-col gap-2 border rounded-lg w-[500px] px-4 pb-4">
      <h3 className="text-2xl text-center border-b p-2">{conference.name}</h3>
      <p className="text-lg">Organizer Name: {conference.organizer.name}</p>
      <p className="text-lg">Venues:</p>
      <ul className="list-inside list-none pl-4">
        {conference.venues.map((venue, index) => (
          <li key={index}>
            {venue.name}, {venue.address}
          </li>
        ))}
      </ul>

      <p className="text-lg">Dates:</p>
      <ul className="list-inside list-none pl-4">
        {conference.dates.map((date, index) => {
          date = new Date(date);
          return <li key={index}>{date.toLocaleDateString()}</li>;
        })}
      </ul>

      <p className="text-lg">Reviewers:</p>
      <ul className="list-inside list-none pl-4">
        {conference.reviewers.map((reviewer, index) => (
          <li key={index}>{reviewer.name}</li>
        ))}
      </ul>
    </div>
  );
}
