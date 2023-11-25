"use client";
import { registerAction } from "@/app/actions";
import { useState } from "react";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");

  const fieldBox = "flex flex-col text-2xl gap-3";
  const textfield =
    "w-[400px] outline-transparent p-2 bg-gray-200 text-gray-900 border-b-[3px] valid:border-green-500";

  return (
    <main className="p-20">
      <form
        className="grid grid-cols-1 place-items-center gap-12"
        action={async (formdata) => {
          const result = await registerAction(formdata);
          if (result.error === 0) {
            console.log(result.payload);
          } else setErrorMsg(result.message);
        }}>
        <p className="text-4xl font-semibold">Register</p>
        <div className={fieldBox}>
          <label
            htmlFor="na,e"
            className="">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={textfield}
            required
            onChange={() => setErrorMsg("")}
          />
        </div>

        <div className={fieldBox}>
          <label
            htmlFor="email"
            className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={textfield}
            required
            onChange={() => setErrorMsg("")}
          />
        </div>

        <div className={fieldBox}>
          <label
            htmlFor="password"
            className="">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={textfield}
            required
            onChange={() => setErrorMsg("")}
          />
        </div>
        <p
          className={`h-[50px] text-red-300 text-xl font-medium ${
            errorMsg ? "error" : ""
          }`}>
          {errorMsg}
        </p>
        <input
          type="submit"
          value="Sign Up"
          className="w-[200px] bg-gray-200 text-gray-900 p-2 text-2xl font-semibold cursor-pointer hover:bg-gray-900 hover:text-slate-200 border-2"
        />
      </form>
    </main>
  );
}
