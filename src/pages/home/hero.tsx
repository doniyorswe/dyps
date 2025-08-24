"use client";

import Typewriter from "@/components/elements/typewriter";
import { buttonVariants } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const { data } = useUser();
  return (
    <div className="pt-28 text-center">
      <h1 className="text-5xl font-medium">Deploy your project simple</h1>
      <p className="text-muted-foreground mt-3 max-w-lg mx-auto mb-5 text-lg">
        <span>
          dyps gives developers instant deployments and modern infrastructure{" "}
        </span>
        <Typewriter items={["— simple", "— fast", "— and reliable"]} />
      </p>
      <Link href={!!data ? "/projects" : "/auth"} className={buttonVariants()}>
        <span>Get started</span>
        <ArrowRight />
      </Link>
    </div>
  );
}
