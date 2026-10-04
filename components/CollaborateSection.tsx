"use client";

import React, { useState } from "react";
import MorpheusPills from "./MorpheusPills";
import { Mail, Copy, Check, ExternalLink, Lock } from "lucide-react";
import { ContactInfo } from "@/lib/data";

function LinkedinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function GithubIcon({ className = "w-6 h-6" }: { className?: string }) {
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

interface CollaborateSectionProps {
  contact: ContactInfo;
}

export default function CollaborateSection({ contact }: CollaborateSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isRedPillSelected, setIsRedPillSelected] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  return (
    <section
      id="collaborate"
      className="py-24 px-6 max-w-5xl mx-auto border-t border-zinc-200 dark:border-zinc-800/80 relative z-10"
    >
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          Ready to Connect?
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-mono">
          Let&apos;s <span className="text-emerald-500">Collaborate</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl">
          Interested in starting a project, discussing software engineering, or exploring opportunities? Choose the red pill below to reveal contact details.
        </p>
      </div>

      {/* Morpheus Hands & Red/Blue Pills Interactive Component */}
      <MorpheusPills
        onSelectRedPill={() => setIsRedPillSelected(true)}
        onSelectBluePill={() => setIsRedPillSelected(false)}
      />

      {/* Contact Cards Grid shown ONLY when Red Pill is selected */}
      {!isRedPillSelected ? (
        <div className="mt-8 p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center flex flex-col items-center justify-center gap-3 font-mono shadow-xl transition-all">
          <div className="p-3.5 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Collaborate Channels Encrypted
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
            Collaborate options are hidden by default. Select the <span className="text-red-400 font-bold uppercase tracking-wider">Red Pill</span> above to decrypt contact details and collaborate channels.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 transition-all duration-500 animate-fade-in">
          {/* EMAIL CARD */}
          <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
                  Direct Contact
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">Email</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                Send me an email directly for inquiries or opportunities.
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate select-all">
                {contact.email}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              <button
                onClick={() => handleCopy(contact.email, "email")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 transition-colors shadow-sm"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-950" />
                    <span>Copied Email!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                title="Open Mail Client"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* LINKEDIN CARD */}
          <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
                  Professional
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">LinkedIn</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                Connect with me professionally on LinkedIn.
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate select-all">
                {contact.linkedin}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              <button
                onClick={() => handleCopy(contact.linkedin, "linkedin")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-zinc-950 transition-colors shadow-sm"
              >
                {copiedField === "linkedin" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-950" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                title="Visit LinkedIn Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* GITHUB CARD */}
          <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
                  Code Repos
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">GitHub</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                Explore my repositories and open-source contributions.
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate select-all">
                {contact.github}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              <button
                onClick={() => handleCopy(contact.github, "github")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-purple-600 dark:hover:bg-purple-400 dark:hover:text-zinc-950 transition-colors shadow-sm"
              >
                {copiedField === "github" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-950" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                title="Visit GitHub Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
