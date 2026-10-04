"use client";

import React from "react";
import Link from "next/link";
import { Folder, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/lib/data";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectDetailUrl = `/projects/${project.id}`;

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl dark:hover:shadow-zinc-950/50 transition-all duration-300">
      <div>
        {/* Top Row: Folder Icon with Red Pill on top & GitHub Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative inline-flex items-center">
            {/* Folder Icon Container */}
            <Link
              href={projectDetailUrl}
              className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 transition-colors inline-flex items-center justify-center"
              title="View Project Details"
            >
              <Folder className="w-6 h-6" />
            </Link>

            {/* RED PILL ON TOP OF FOLDER ICON */}
            <Link
              href={projectDetailUrl}
              className="absolute -top-2 -right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-700 border border-red-300 shadow-[0_0_10px_rgba(239,68,68,0.7)] text-[10px] font-mono font-bold text-white tracking-wider hover:scale-110 active:scale-95 transition-all duration-300 group/pill"
              title="Matrix Red Pill: Enter Project Room"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </Link>
          </div>

          {/* Action Links (GitHub & Live Demo) */}
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="View Source Code on GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Title with link */}
        <Link href={projectDetailUrl} className="block group/title">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover/title:text-emerald-500 dark:group-hover/title:text-emerald-400 transition-colors font-mono">
            {project.title}
          </h3>
        </Link>

        {/* Project Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Details Page Link */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
          <Link
            href={projectDetailUrl}
            className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-emerald-600 dark:text-emerald-400 hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>View Full Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
