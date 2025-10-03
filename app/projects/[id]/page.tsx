"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";
import { format } from "date-fns";
import { useApi } from "@/hooks/use-api";
import { use } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "ready":
      return "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400";
    case "cloning":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400";
    case "installing":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400";
    case "building":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400";
    case "deploying":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400";
    case "failed":
      return "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400";
    default:
      return "bg-muted/50 text-muted-foreground border-border";
  }
};

type PageProps = {
  params: Promise<{ id: number }>;
};

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { data } = useApi<Project>(`projects/${id}`).get(undefined, {
    refetchInterval: 3000,
  });

  return (
    <div className="bg-background">
      <div className="space-y-8">
        <div className="border-b border-border pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {data?.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Deployments
            </h2>
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground"
            >
              {data?.deployments_list?.length} deployments
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {data?.deployments_list?.map((deployment) => (
              <Card
                key={deployment.id}
                className="bg-card border-border hover:shadow-lg transition-all duration-200 hover:border-border/80 p-0 rounded-sm"
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between w-full">
                    {/* Domain */}
                    <div className="flex items-center gap-2">
                      <code className="text-sm px-2 py-1 rounded text-sky-500 font-mono">
                        {deployment.status == "ready" ? <a
                          href={`https://${data?.subdomain}.dyps.uz`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {`${data?.subdomain}.dyps.uz`}
                        </a> : <span>domain loading...</span>}
                      </code>
                      {deployment.status === "ready" && (
                        <Button variant="ghost" size="sm">
                          <a
                            href={`https://${data?.subdomain}.dyps.uz`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <Badge
                        variant="outline"
                        className={getStatusColor(deployment.status)}
                      >
                        {deployment.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-muted text-foreground font-mono"
                      >
                        <GitBranch className="w-4 h-4 text-muted-foreground" />
                        {data.default_branch}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {format(deployment.created_at, "HH:mm, dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
