"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <header className=" border-b border-gray-800 p-5 flex justify-between items-center">
      <p className="text-5xl w-[150px]">CMS</p>
      <LoginBTN
        user={user}
        setUser={setUser}
        className={
          "text-2xl border-2 px-3 py-1 bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-slate-200"
        }
      />
    </header>
  );
}

function LoginBTN({ user, setUser, className }) {
  if (!user)
    return (
      <Link
        href="/pages/login/"
        className={className}>
        Login
      </Link>
    );

  return (
    <>
      <p className="text-3xl">Hi {`${user.name}!`}</p>
      <div className="w-[150px] flex justify-end">
        <Link
          href="/"
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
          className={className}>
          Log Out
        </Link>
      </div>
    </>
  );
}
