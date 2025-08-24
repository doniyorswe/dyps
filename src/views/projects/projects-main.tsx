"use client";

import DeleteModal from "@/components/custom/delete-modal";
import EmptyBox from "@/components/elements/empty-box";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import ProjectCard from "@/views/projects/project-card";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ProjectsMain() {
  const { data } = useApi<Project>("projects").list();
  const [item, setItem] = useState<Project>();

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Search project..." className="w-auto" />
        <Link
          href={"/projects/new"}
          className={buttonVariants({ variant: "secondary" })}
        >
          <Plus />
          New
        </Link>
      </div>

      {data?.length ? (
        <div className="grid grid-cols-2 gap-4 py-4">
          {data?.map((p) => (
            <ProjectCard p={p} key={p.id} handleDelete={() => setItem(p)} />
          ))}
        </div>
      ) : (
        <EmptyBox />
      )}

      <DeleteModal path="projects" id={item?.id} />
    </div>
  );
}
