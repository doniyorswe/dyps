"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronRight, Github, GitBranch } from "lucide-react";
import { useApi, usePost } from "@/hooks/use-api";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Fields = {
  repo: number;
  name: string;
};

export default function DeployFrame({ params }: PageProps) {
  const { id } = React.use(params); // unwrap
  const { push } = useRouter();

  const [showBuildSettings, setShowBuildSettings] = useState(false);
  const [showEnvVariables, setShowEnvVariables] = useState(false);

  const { data } = useApi<Repo>(`gh/repos/${id}`).get();
  const { mutate, isPending } = usePost();

  const { register, handleSubmit } = useForm<Fields>({
    values: {
      name: String(data?.name).toLowerCase()!,
      repo: data?.id!,
    },
  });

  const onSubmit = (vals: Fields) => {
    mutate("projects", {
      ...vals,
      name: vals.name.toLowerCase()
    }, {
      onSuccess(data: Project) {
        push(`/projects/${data.id}`);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto bg-background rounded-lg border border-primary dark:border-secondary p-8 mb-8 mt-16"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">New Project</h1>

      {/* GitHub Import Section */}
      <div className="bg-secondary dark:bg-card rounded-lg p-4 mb-8">
        <div className="text-muted-foreground text-sm mb-2">
          Importing from GitHub
        </div>
        <div className="flex items-center gap-1">
          <Github className="w-5 h-5" />
          <a
            href={`https://github.com/${data?.full_name}`}
            target="_blank"
            className="font-medium mx-2"
          >
            {data?.full_name}
          </a>
          <GitBranch className="w-4 h-4 text-muted-foreground" />
          <a
            href={`https://github.com/${data?.full_name}/tree/${data?.default_branch}`}
            className="text-muted-foreground"
            target="_blank"
          >
            {data?.default_branch}
          </a>
        </div>
      </div>

      {/* Team and Project Name */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Framework Preset */}
        <div>
          <label className="block text-muted-foreground text-sm font-medium mb-1">
            Framework Preset
          </label>
          <Select defaultValue="reactjs">
            <SelectTrigger className="bg-secondary dark:bg-card border-secondary w-full">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-secondary dark:bg-black rounded flex items-center justify-center">
                  <span className="text-lg font-bold">⚛</span>
                </div>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-secondary dark:bg-card border-secondary">
              <SelectItem value="reactjs">React Js</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <fieldset>
          <label
            htmlFor="name"
            className="block text-muted-foreground text-sm font-medium mb-1"
          >
            Project name
          </label>
          <Input {...register("name", { required: true })} id="name" />
        </fieldset>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4 mb-8">
        <button
          type="button"
          onClick={() => setShowBuildSettings(!showBuildSettings)}
          className="w-full flex items-center gap-2 p-4 bg-secondary dark:bg-card rounded-lg text-left hover:bg-gray-750 transition-colors"
        >
          {showBuildSettings ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-muted-foreground">
            <span>Build and Output Settings</span>
            <span className="opacity-40 pl-2">{"soon"}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setShowEnvVariables(!showEnvVariables)}
          className="w-full flex items-center gap-2 p-4 bg-secondary dark:bg-card rounded-lg text-left hover:bg-gray-750 transition-colors"
        >
          {showEnvVariables ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-muted-foreground">
            <span>Environment Variables</span>
            <span className="opacity-40 pl-2">{"soon"}</span>
          </span>
        </button>
      </div>

      {/* Deploy Button */}
      <Button
        className="w-full bg-foreground text-muted hover:bg-gray-100 font-medium py-3 text-lg"
        disabled={isPending}
      >
        Deploy
      </Button>
    </form>
  );
}
