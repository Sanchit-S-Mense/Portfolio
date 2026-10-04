import { getProjectFromDetailsTxt, getProjectById } from "@/lib/data";
import ProjectDetailView from "@/components/ProjectDetailView";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface ProjectDynamicPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDynamicPage({ params }: ProjectDynamicPageProps) {
  const { id } = await params;
  const project = getProjectFromDetailsTxt(id) || getProjectById(id);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailView project={project} />;
}
