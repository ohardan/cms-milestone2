"use client";
import { createConferenceAction } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  DeleteOutlined,
  LeftOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import Link from "next/link";

export default function RegisterConference() {
  const searchParams = useSearchParams();
  const organizerId = searchParams.get("organizerId");

  const [errorMsg, setErrorMsg] = useState("");

  const [reviewersList, setReviewersList] = useState([
    { name: "", email: "", expertise: "" },
  ]);
  const [reviewersCount, setReviewersCount] = useState(0);
  useEffect(() => setReviewersCount(reviewersList.length), [reviewersList]);

  const [venuesList, setVenuesList] = useState([{ name: "", address: "" }]);
  const [venuesCount, setVenuesCount] = useState(0);
  useEffect(() => setVenuesCount(venuesList.length), [venuesList]);

  const [dates, setDates] = useState([]);
  const [datesCount, setDatesCount] = useState(0);
  useEffect(() => setDatesCount(dates.length), [dates]);

  return (
    <main className="flex flex-col items-center gap-8 m-12">
      <h1 className="text-5xl">Register A New Conference</h1>
      <form
        action={async (formdata) => {
          createConferenceAction(formdata).then((result) => {
            if (result.error === 0) {
              setErrorMsg("");
              redirect("/dashboard");
            } else {
              setErrorMsg(result.message);
            }
          });
        }}
        className="flex flex-col items-center text-xl gap-6">
        <input
          hidden
          readOnly
          name="organizerId"
          value={organizerId}
        />

        <input
          hidden
          readOnly
          name="reviewersCount"
          value={reviewersCount}
        />

        <input
          hidden
          readOnly
          name="venuesCount"
          value={venuesCount}
        />

        <input
          hidden
          readOnly
          name="datesCount"
          value={datesCount}
        />

        <div className="flex flex-col gap-6 w-[600px]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-2xl">
              Conference Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-[600px] outline-transparent bg-slate-200 text-gray-900 p-1 border-b-[3px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="w-[600px] text-2xl">Dates:</h3>
              <button
                type="button"
                className="grid place-items-center hover:bg-blue-700 rounded-full w-[30px] h-[30px] transition-colors duration-100"
                onClick={() => {
                  const date = new Date();
                  setDates((curr) => [...curr, date.toJSON()]);
                }}>
                <PlusCircleFilled />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {dates.map((date, index) => {
                const dateObj = new Date(date);
                return (
                  <div className="flex items-center justify-between">
                    <DatePicker
                      key={index}
                      selected={dateObj}
                      className="w-[300px] outline-transparent bg-slate-200 text-gray-900 p-1 border-b-[3px]"
                      onChange={(date) => {
                        setDates((curr) => {
                          curr[index] = date.toJSON();
                          return [...curr];
                        });
                      }}
                    />

                    <button
                      type="button"
                      className="grid place-items-center hover:text-white hover:bg-red-500 rounded-full w-[30px] h-[30px] transition-colors duration-100"
                      onClick={() =>
                        setDates((curr) => curr.filter((_, i) => i !== index))
                      }>
                      <DeleteOutlined />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="w-[300px] text-2xl">Venues:</h3>
              <button
                type="button"
                className="grid place-items-center hover:bg-blue-700 rounded-full w-[30px] h-[30px] transition-colors duration-100"
                onClick={() => {
                  setVenuesList((curr) => [...curr, { name: "", address: "" }]);
                }}>
                <PlusCircleFilled />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-scroll w-[600px] p-2">
              {venuesList.map((venue, index) => {
                return (
                  <VenueCard
                    key={index}
                    index={index}
                    venue={venue}
                    setVenuesList={setVenuesList}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="w-[300px] text-2xl">Reviewers:</h3>
              <button
                type="button"
                className="grid place-items-center hover:bg-blue-700 rounded-full w-[30px] h-[30px] transition-colors duration-100"
                onClick={() => {
                  setReviewersList((curr) => [
                    ...curr,
                    { name: "", email: "", expertise: "" },
                  ]);
                }}>
                <PlusCircleFilled />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-scroll w-[600px] p-2">
              {reviewersList.map((venue, index) => {
                return (
                  <ReviewerCard
                    key={index}
                    index={index}
                    reviewer={venue}
                    setReviewersList={setReviewersList}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between w-[600px]">
          <Link
            href="/dashboard"
            className="cursor-pointer text-2xl border-2 px-3 py-1 bg-slate-200 text-gray-900 hover:bg-gray-900 hover:text-slate-200 transition-colors duration-100 grid place-items-center h-[50px]">
            <LeftOutlined />
          </Link>
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer text-2xl border-2 px-3 py-1 bg-slate-200 text-gray-900 hover:bg-gray-900 hover:text-slate-200 transition-colors duration-100 h-[50px]"
          />
        </div>
      </form>

      <p
        className={`bg-red-600 bg-opacity-20 p-4 rounded-md border-red-400 border w-[600px] ${
          !errorMsg ? "hidden" : ""
        }`}>
        {errorMsg}
      </p>
    </main>
  );
}

function ReviewerCard({ index, reviewer, setReviewersList }) {
  const textInput =
    "bg-slate-200 text-gray-900 px-1 border-[2px] outline-transparent w-[200px]";
  return (
    <div className="grid place-items-center gap-1 bg-slate-500 rounded-md text-base w-[250px] p-2">
      <h3 className="text-lg font-medium">Reviewer {index + 1}</h3>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name={"name" + index}
        required
        className={textInput}
        value={reviewer.name}
        onChange={(e) => {
          setReviewersList((curr) => {
            curr[index].name = e.target.value;
            return [...curr];
          });
        }}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name={"email" + index}
        required
        className={`${textInput} valid:border-green-700`}
        value={reviewer.email}
        onChange={(e) => {
          setReviewersList((curr) => {
            curr[index].email = e.target.value;
            return [...curr];
          });
        }}
      />

      <label htmlFor="expertise">Expertise</label>
      <input
        type="text"
        id="expertise"
        name={"expertise" + index}
        required
        className={textInput}
        value={reviewer.expertise}
        onChange={(e) => {
          setReviewersList((curr) => {
            curr[index].expertise = e.target.value;
            return [...curr];
          });
        }}
      />

      <button
        type="button"
        className="grid place-items-center hover:text-white hover:bg-red-500 rounded-full w-[30px] h-[30px] transition-colors duration-100"
        onClick={() =>
          setReviewersList((curr) => curr.filter((_, i) => i !== index))
        }>
        <DeleteOutlined />
      </button>
    </div>
  );
}

function VenueCard({ index, venue, setVenuesList }) {
  const textInput =
    "bg-slate-200 text-gray-900 px-1 border-[2px] outline-transparent w-[200px]";
  return (
    <div className="grid place-items-center gap-1 bg-slate-500 rounded-md text-base w-[250px] p-2">
      <h3 className="text-lg font-medium">Venue {index + 1}</h3>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name={"name" + index}
        required
        className={textInput}
        value={venue.name}
        onChange={(e) => {
          setVenuesList((curr) => {
            curr[index].name = e.target.value;
            return [...curr];
          });
        }}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name={"address" + index}
        required
        className={textInput}
        value={venue.address}
        onChange={(e) => {
          setVenuesList((curr) => {
            curr[index].address = e.target.value;
            return [...curr];
          });
        }}
      />

      <button
        type="button"
        className="grid place-items-center hover:text-white hover:bg-red-500 rounded-full w-[30px] h-[30px] transition-colors duration-100"
        onClick={() =>
          setVenuesList((curr) => curr.filter((_, i) => i !== index))
        }>
        <DeleteOutlined />
      </button>
    </div>
  );
}
