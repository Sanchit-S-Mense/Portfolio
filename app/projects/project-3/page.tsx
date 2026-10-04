import { getProjectFromDetailsTxt } from "@/lib/data";
import ProjectDetailView from "@/components/ProjectDetailView";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default function ProjectThreePage() {
  const project = getProjectFromDetailsTxt("project-3");

  if (!project) {
    return notFound();
  }

  return <ProjectDetailView project={project} />;
}
