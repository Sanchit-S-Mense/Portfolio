"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Layers,
  Cpu,
  Terminal,
  ShieldCheck,
  Copy,
  Check,
  Image as ImageIcon,
  Maximize2,
  X,
  Eye,
  Sparkles,
} from "lucide-react";
import { Project } from "@/lib/data";
import MatrixRain from "@/components/MatrixRain";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
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

function FigmaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

function getFigmaEmbedUrl(url: string): string {
  if (url.includes("figma.com/embed") || url.includes("embed.figma.com")) {
    return url;
  }
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

function getImgSrc(img: string): string {
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/")) return img;
  return `/${img}`;
}

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const rawFigma = project.figmaUrl?.trim();
  const figmaUrl =
    rawFigma &&
    rawFigma.toLowerCase() !== "null" &&
    rawFigma.toLowerCase() !== "none" &&
    rawFigma.toLowerCase() !== "n/a" &&
    rawFigma.toLowerCase() !== "undefined"
      ? rawFigma
      : undefined;

  const cloneCommand =
    project.cloneCommand ||
    (project.githubUrl
      ? `git clone ${project.githubUrl}.git`
      : `git clone https://github.com/sanchitmense/${project.id}.git`);

  // Extract folder name from URL
  let folderName = project.id;
  if (project.githubUrl) {
    const parts = project.githubUrl.split("/").filter(Boolean);
    if (parts.length > 0) {
      folderName = parts[parts.length - 1];
    }
  }

  // Determine install command based on tech stack
  let runCommand = "npm install && npm run dev";
  const tagsStr = (project.tags || []).join(" ").toLowerCase();
  if (tagsStr.includes("flutter") || tagsStr.includes("dart")) {
    runCommand = "flutter pub get && flutter run";
  } else if (tagsStr.includes("python") || tagsStr.includes("arduino")) {
    runCommand = "pip install -r requirements.txt";
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCmd(true);
    setTimeout(() => {
      setCopiedCmd(false);
    }, 2500);
  };

  const architectureItems = project.architecture || [
    "Modular design pattern",
    "High performance execution",
    "Clean error handling & type safety",
  ];

  const highlightItems = project.highlights || [
    "Fully responsive interface",
    "Interactive matrix-inspired UI components",
    "Easy customization & clean code",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Matrix Background Rain */}
      <MatrixRain />

      {/* Header / Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Matrix Node: {project.id}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 relative z-10 w-full">
        {/* Title & Badge */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4">
            <Code2 className="w-3.5 h-3.5" />
            Project Archive Room
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 font-mono">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-zinc-950 font-mono font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono font-bold text-xs hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          {figmaUrl && (
            <a
              href={figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-200 font-mono font-bold text-xs hover:bg-purple-900 hover:border-purple-400 transition-all flex items-center gap-2"
            >
              <FigmaIcon className="w-4 h-4" />
              <span>Figma Prototype</span>
            </a>
          )}
        </div>

        {/* Tech Stack Grid */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-12 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Overview & Architecture Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            <h3 className="text-sm font-mono font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Core Architecture
            </h3>
            <ul className="text-xs text-zinc-400 space-y-2 font-mono">
              {architectureItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            <h3 className="text-sm font-mono font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Project Highlights
            </h3>
            <ul className="text-xs text-zinc-400 space-y-2 font-mono">
              {highlightItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Terminal with GitHub Repo Clone Commands */}
        <div className="mb-12 p-6 rounded-2xl bg-zinc-950 border border-emerald-500/30 font-mono text-xs shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">terminal ~ clone-repository</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCommand}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-[11px] text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Clone Command</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-emerald-500 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 font-bold">
                STATUS: ONLINE
              </span>
            </div>
          </div>

          <div className="space-y-4 font-mono text-zinc-300 overflow-x-auto p-2">
            <div>
              <span className="text-zinc-500 block mb-1"># 1. Clone the GitHub repository for {project.title}</span>
              <div className="flex items-center gap-2 text-emerald-400 font-bold bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-emerald-500 select-none">$</span>
                <code className="text-emerald-300 text-xs sm:text-sm tracking-tight">{cloneCommand}</code>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block mb-1"># 2. Navigate into project directory</span>
              <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/60">
                <span className="text-emerald-500 select-none">$</span>
                <code>cd {folderName}</code>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block mb-1"># 3. Install dependencies and start</span>
              <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/60">
                <span className="text-emerald-500 select-none">$</span>
                <code>{runCommand}</code>
              </div>
            </div>
          </div>
        </div>

        {/* PROTOTYPE / GALLERY SECTION AT BOTTOM OF PROJECT DIRECTORY */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                {figmaUrl ? <FigmaIcon className="w-5 h-5" /> : <ImageIcon className="w-5 h-5 text-emerald-400" />}
              </div>
              <div>
                <h2 className="text-xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                  {figmaUrl ? "Prototype & Visuals" : "Project Gallery"}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30 font-normal">
                    {figmaUrl ? "Interactive & Media" : "Media Showcase"}
                  </span>
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  {figmaUrl
                    ? "Figma prototype embedded preview, UI mockups & project images"
                    : "Project screenshots, diagrams & visual media"}
                </p>
              </div>
            </div>
            {(figmaUrl || (project.images && project.images.length > 0)) && (
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold uppercase tracking-wider">
                {figmaUrl ? "Prototype Ready" : "Gallery Ready"}
              </span>
            )}
          </div>

          {/* FIGMA PROTOTYPE EMBEDDED PREVIEW */}
          {figmaUrl && (
            <div className="mb-8 rounded-2xl bg-zinc-950 border border-purple-500/30 overflow-hidden shadow-2xl">
              <div className="p-4 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FigmaIcon className="w-5 h-5" />
                  <span className="font-mono text-xs font-bold text-zinc-200">
                    Figma Live Prototype
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
                </div>
                <a
                  href={figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:shadow-purple-500/20"
                >
                  <span>Open Figma Prototype</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="relative w-full h-[480px] sm:h-[580px] bg-zinc-900">
                <iframe
                  className="w-full h-full border-0"
                  src={getFigmaEmbedUrl(figmaUrl)}
                  allowFullScreen
                  title={`${project.title} Figma Prototype`}
                />
              </div>
            </div>
          )}

          {/* IMAGES & SCREENSHOTS GALLERY */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
              <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                Project Screenshots & Images ({project.images.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className="group relative rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950 cursor-pointer aspect-video hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <img
                      src={getImgSrc(img)}
                      alt={`${project.title} Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Maximize2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-mono text-white font-semibold">View Image</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GUIDANCE CARD WHEN NO FIGMA/IMAGES ARE CONFIGURED YET */}
          {!figmaUrl && (!project.images || project.images.length === 0) && (
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-dashed border-zinc-800 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="space-y-3 w-full">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-zinc-200">
                      Project Gallery Ready
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
                      You can add project images for this project by editing its <code className="text-emerald-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">details.txt</code> file in <code className="text-emerald-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">app/projects/{project.id}/details.txt</code>.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-1.5">
                    <p className="text-emerald-400 font-semibold"># Add to details.txt:</p>
                    <p>
                      <span className="text-blue-400 font-bold">Images:</span> /projects/{project.id}/screenshot1.png, https://.../demo.png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CREDITS IF PRESENT */}
          {project.credits && project.credits.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-zinc-400">
              <span className="text-emerald-400 font-bold block mb-1">Project Credits & External Resources:</span>
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                {project.credits.map((cred, i) => (
                  <li key={i}>{cred}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      {/* IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:bg-red-900/80 transition-colors cursor-pointer"
              title="Close Fullscreen View"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={getImgSrc(selectedImage)}
              alt="Enlarged screenshot"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6 text-center text-xs text-zinc-500 font-mono relative z-10">
        <p>© {new Date().getFullYear()} Matrix Portfolio • Project Room: {project.id}</p>
      </footer>
    </div>
  );
}

