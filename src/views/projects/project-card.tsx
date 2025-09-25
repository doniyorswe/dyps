import { ActionMenu } from "@/components/custom/action-menu";
import { GithubIcon } from "@/components/icons";
import useModal from "@/hooks/use-modal";
import { localDate } from "@/lib/utils";
import { GitBranch } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProjectCard({
  p,
  handleDelete,
}: {
  p: Project;
  handleDelete: () => void;
}) {
  const delModal = useModal("delete");
  const { push } = useRouter();

  return (
    <div
      className="border rounded-md shadow p-3 hover:border-muted-foreground/40"
      onClick={() => push(`/projects/${p.id}`)}
    >
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex justify-between w-full">
          <span
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://${p.subdomain}.dyps.uz`, "_blank");
            }}
            className="text-lg text-blue-500 dark:text-blue-400 cursor-pointer hover:underline"
          >
            {`https://${p.subdomain}.dyps.uz`}
          </span>
          <ActionMenu
            options={[
              {
                key: "delete",
                label: "Delete",
                onClick: () => {
                  handleDelete();
                  delModal.open();
                },
              },
            ]}
          />
        </div>
        <span
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://github.com/${p.repo}`, "_blank");
          }}
          className="bg-secondary px-2 py-0.5 flex items-center gap-1 rounded-xl cursor-pointer hover:underline"
        >
          <GithubIcon />
          <span className="text-sm">{p.repo}</span>
        </span>

        <p>last commit</p>

        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>{localDate(p.created_at)} on</p>
            <span className="flex items-center">
              <GitBranch size={14} />
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://github.com/${p.repo}/tree/${p.default_branch}`,
                    "_blank"
                  );
                }}
                className="hover:underline cursor-pointer"
              >
                {p.default_branch}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>{p.deployments} deployment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
