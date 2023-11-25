"use client";
import Link from "next/link";

export default function Header({ user, setUser, formPage }) {
  return (
    <header className=" border-b border-gray-800 p-5 flex justify-between items-center">
      <Link
        href="/"
        className="text-5xl w-[150px]">
        CMS
      </Link>

      {formPage ? (
        ""
      ) : (
        <LoginBTN
          user={user}
          setUser={setUser}
          className={
            "text-2xl border-2 px-3 py-1 bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-slate-200 transition-colors duration-100"
          }
        />
      )}
    </header>
  );
}

function LoginBTN({ user, setUser, className }) {
  if (!user)
    return (
      <Link
        href="/forms/login/"
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
