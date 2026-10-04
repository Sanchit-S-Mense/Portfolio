import { getProjectFromDetailsTxt, getProjectById, getPortfolioData } from "@/lib/data";
import ProjectDetailView from "@/components/ProjectDetailView";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPortfolioData().projects.map((project) => ({ id: project.id }));
}

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
