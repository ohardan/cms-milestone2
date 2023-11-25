"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) redirect("/dashboard");
    else redirect("/forms/login");
  }, []);
}
