"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
      />
      {children}
      <footer className=" border-t border-gray-800 p-5 grid place-items-center text-lg">
        <p>Copyright &copy; 2023 CMPS310</p>
      </footer>
    </>
  );
}
