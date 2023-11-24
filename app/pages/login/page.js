"use client";
import { loginAction } from "@/app/actions";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");

  const fieldBox = "flex flex-col text-2xl gap-3";
  const textfield =
    "w-[400px] outline-transparent p-2 bg-gray-200 text-gray-900 border-b-[3px] valid:border-green-500";

  return (
    <main className="p-20">
      <form
        className="grid grid-cols-1 place-items-center gap-12"
        action={async (formdata) => {
          const result = await loginAction(formdata);
          if (result.error === 0) {
            localStorage.setItem("user", JSON.stringify(result.payload));
            redirect("/pages/register-conference/");
          }
          setErrorMsg(result.message);
        }}>
        <p className="text-4xl font-semibold">Login</p>
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
          value="Log In"
          className="w-[200px] bg-gray-200 text-gray-900 p-2 text-2xl font-semibold cursor-pointer hover:bg-gray-900 hover:text-slate-200 border-2"
        />
      </form>
    </main>
  );
}
