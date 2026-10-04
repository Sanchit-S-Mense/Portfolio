import { getProjectFromDetailsTxt } from "@/lib/data";
import ProjectDetailView from "@/components/ProjectDetailView";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function ProjectTwoPage() {
  const project = getProjectFromDetailsTxt("project-2");

  if (!project) {
    return notFound();
  }

  return <ProjectDetailView project={project} />;
}
