"use client";

import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";

export default function Header() {
  const api = useApi<User>("auth/me");

  const { data, isSuccess } = api.get();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between py-2">
      <h1
        className="text-2xl select-none cursor-pointer"
        onClick={() => router.push("/")}
      >
        dyps
      </h1>
      <Link
        href={isSuccess ? "/projects" : "/auth"}
        className={buttonVariants()}
      >
        <span>{data?.github_login ?? "Sign In"}</span>
        <Github />
      </Link>
    </header>
  );
}
