"use client";

import React, { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "@/components/icons";
import { Lock, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useApi } from "@/hooks/use-api";
import { cn, localDate } from "@/lib/utils";
import useUser from "@/hooks/use-user";
import Link from "next/link";

export default function ProjectCreateForm() {
  const { data } = useApi<Repo>("gh/repos").list();
  const { data: organizations } =
    useApi<Organization>("gh/organizations").list();

  const { data: user } = useUser();

  const accounts = useMemo(() => {
    if (user && organizations) {
      return [
        {
          id: user.id,
          name: user.github_login,
        },
        ...organizations.map((org) => ({
          id: org.id,
          name: org.login,
        })),
      ];
    } else return [];
  }, [user, organizations]);

  return (
    <div className="p-5 dark:bg-card rounded-sm mt-3">
      <p className="text-xl">Import Git Repository</p>
      <div className="grid grid-cols-2 gap-2 py-2">
        <Select defaultValue="1">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {accounts.map((acc) => (
                <SelectItem value={acc.id.toString()} key={acc.id}>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">
                      <GithubIcon />
                    </span>
                    <span>{acc.name}</span>
                  </div>
                </SelectItem>
              ))}
              <SelectItem value={"new"}>
                <div className="flex items-center gap-2">
                  <span className="text-foreground">
                    <Plus />
                  </span>
                  <span>Add Github Account</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="Search..." />
      </div>

      <div className="mt-3 border border-secondary rounded max-h-[500px] overflow-y-auto no-scrollbar">
        {data?.map((r) => (
          <div
            className="flex items-center py-3 px-4 gap-2 border-b"
            key={r.id}
          >
            <p>{r.name}</p>
            {r.private && <Lock size={14} />}
            <p className="text-sm text-muted-foreground">
              {localDate(r.created_at)}
            </p>
            <Link
              href={`/projects/deploy/${r.id}`}
              className={cn("ml-auto", buttonVariants())}
            >
              Import
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
