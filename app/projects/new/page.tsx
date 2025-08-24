import ProjectCreateForm from "@/pages/projects/create-form";
import React from "react";

export default function page() {
  return (
    <div className="py-4">
      <div className="max-w-xl mx-auto">
        <div className="py-2">
          <h2 className="text-4xl font-medium">Kickstart instantly.</h2>
          <p className="text-muted-foreground">
            Import your existing repository and deploy in seconds
          </p>
        </div>

        <ProjectCreateForm />
      </div>
    </div>
  );
}
