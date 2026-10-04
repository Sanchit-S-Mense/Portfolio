import Link from "next/link";
import { getPortfolioData } from "@/lib/data";
import MatrixRain from "@/components/MatrixRain";
import ProjectCard from "@/components/ProjectCard";
import CollaborateSection from "@/components/CollaborateSection";
import { Terminal, Code, ArrowDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 transition-colors duration-300 relative font-sans overflow-x-hidden">
      {/* Matrix Digital Rain Animation Background (falling 0s & 1s) */}
      <MatrixRain />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="#home"
            className="text-lg font-extrabold tracking-tight font-mono hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <Terminal className="w-5 h-5 text-emerald-500" />
            <span>{data.name}</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-mono font-medium">
            <Link
              href="#home"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="#projects"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#collaborate"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all font-semibold"
            >
              Collaborate
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero / Homepage Section */}
        <section
          id="home"
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-6 py-20 text-center relative max-w-4xl mx-auto"
        >
          {/* Matrix System Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold tracking-wide mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online • Matrix Active
          </div>

          {/* Name Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 font-mono">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {data.name}
            </span>
          </h1>

          {/* Welcome Text */}
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-10 font-normal">
            {data.welcome}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-mono font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 group"
            >
              <Code className="w-4 h-4" />
              View Projects
            </Link>
            <Link
              href="#collaborate"
              className="px-6 py-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-white font-mono font-semibold text-sm hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center gap-2"
            >
              Collaborate With Me
            </Link>
          </div>

          {/* Animated Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-xs font-mono animate-bounce">
            <span>Scroll Down</span>
            <ArrowDown className="w-4 h-4 text-emerald-500" />
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-800/80"
        >
          <div className="flex flex-col items-start gap-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
              Projects
            </h2>
            <p className="text-zinc-400 text-base max-w-xl">
              Select a project card or click the <span className="text-red-400 font-mono font-bold">RED PILL</span> on top of any folder icon to enter its individual room.
            </p>
          </div>

          {data.projects.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-zinc-800 text-center">
              <p className="text-zinc-400 font-mono">
                No projects found in <code className="bg-zinc-900 px-2 py-1 rounded text-sm text-emerald-400">data/projects.txt</code>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* Collaborate Section at the bottom of the page */}
        <CollaborateSection contact={data.contact} />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6 text-center text-xs text-zinc-500 font-mono relative z-10">
        <p> PS: This page was put together just an hour before submissions, so it would be fair to add the title ‘works well under pressure’ on the resume:)</p>
      </footer>
    </div>
  );
}
