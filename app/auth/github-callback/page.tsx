"use client";

import { baseURL } from "@/services/axios-instance";
import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";

export default function GithubCallback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;
    axios
      .get(`${baseURL}/auth/github-callback?code=${code}`)
      .then((data) => {
        console.log(data.data);

        // Token backend’dan allaqachon olingan
        localStorage.setItem("token", data.data.access_token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        window.location.replace("/projects");
      })
      .catch(console.error);
  }, []);

  return (
    <div className="py-10 flex justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
