"use client";

import Spinner from "@/components/ui/spinner";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    window.location.replace("https://dyps.kassalite.uz/auth/github");
  }, []);
  return (
    <div className="pt-20">
      <div className="flex items-center flex-col gap-3">
        <Spinner />
      </div>
    </div>
  );
}
