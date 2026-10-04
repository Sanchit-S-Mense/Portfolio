"use client";

import React, { useState } from "react";

interface MorpheusPillsProps {
  onSelectRedPill?: () => void;
  onSelectBluePill?: () => void;
}

export default function MorpheusPills({ onSelectRedPill, onSelectBluePill }: MorpheusPillsProps) {
  const [isBlueHovered, setIsBlueHovered] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  // Default color assignment: Left = Red, Right = Blue
  // When Blue pill is hovered, colors swap: Left = Blue, Right = Red!
  const leftIsRed = !isBlueHovered;
  const rightIsRed = isBlueHovered;

  const handleRedClick = () => {
    setActiveMessage("🔴 Red Pill Chosen: Reality unlocked! Collaborate options revealed below.");
    if (onSelectRedPill) onSelectRedPill();
  };

  const handleBlueClick = () => {
    setActiveMessage("🔵 Blue Pill Chosen: The story ends. Collaborate options remain hidden in the Matrix.");
    if (onSelectBluePill) onSelectBluePill();
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 p-6 rounded-3xl bg-zinc-900/80 border border-emerald-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden group">
      <div className="text-center mb-6 z-10">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
          Hand of Morpheus
        </span>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2 font-mono">
          Make Your Choice
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md">
          Choose the red pill..and I will show you how deep this rabbit hole goes
        </p>
      </div>

      {/* Hands Container */}
      <div className="flex flex-row items-center justify-center gap-8 sm:gap-16 my-4 z-10">
        {/* LEFT HAND & PILL */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={leftIsRed ? handleRedClick : handleBlueClick}
            className={`relative flex items-center justify-center w-28 sm:w-36 h-28 sm:h-36 rounded-2xl border ${
              leftIsRed
                ? "border-red-500/50 bg-red-950/30 shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                : "border-blue-500/50 bg-blue-950/30 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            } transition-all duration-500 transform hover:scale-110 active:scale-95 cursor-pointer group/left`}
          >
            {/* Hand Silhouette Graphic */}
            <svg
              className="absolute inset-0 w-full h-full p-4 text-zinc-600/40 pointer-events-none"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a1 1 0 011 1v6h2V4a1 1 0 112 0v5h1.5a1.5 1.5 0 011.5 1.5V17a5 5 0 01-5 5H9a5 5 0 01-5-5v-6.5A1.5 1.5 0 015.5 9H7V3a1 1 0 112 0v6h2V3a1 1 0 011-1z" />
            </svg>

            {/* Pill */}
            <div
              className={`w-14 sm:w-16 h-7 sm:h-8 rounded-full border ${
                leftIsRed
                  ? "bg-gradient-to-r from-red-600 via-rose-500 to-red-700 border-red-300 shadow-[0_0_15px_#ef4444]"
                  : "bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 border-blue-300 shadow-[0_0_15px_#3b82f6]"
              } transition-all duration-500 flex items-center justify-between px-2 transform rotate-[-25deg]`}
            >
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter opacity-80 select-none">
                {leftIsRed ? "RED" : "BLUE"}
              </span>
              <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            </div>
          </button>
          <span className="text-xs font-mono text-zinc-400 font-semibold">
            {leftIsRed ? "RED PILL" : "BLUE PILL"}
          </span>
        </div>

        {/* SWAP INDICATOR */}
        <div className="hidden sm:flex flex-col items-center gap-1 text-emerald-500/60 font-mono text-xs animate-pulse">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>

        {/* RIGHT HAND & PILL (HOVER SENSITIVE FOR SWAP) */}
        <div className="flex flex-col items-center gap-3">
          <button
            onMouseEnter={() => setIsBlueHovered(true)}
            onMouseLeave={() => setIsBlueHovered(false)}
            onClick={rightIsRed ? handleRedClick : handleBlueClick}
            className={`relative flex items-center justify-center w-28 sm:w-36 h-28 sm:h-36 rounded-2xl border ${
              rightIsRed
                ? "border-red-500/50 bg-red-950/30 shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                : "border-blue-500/50 bg-blue-950/30 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            } transition-all duration-500 transform hover:scale-110 active:scale-95 cursor-pointer group/right`}
          >
            {/* Hand Silhouette Graphic */}
            <svg
              className="absolute inset-0 w-full h-full p-4 text-zinc-600/40 pointer-events-none transform scale-x-[-1]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a1 1 0 011 1v6h2V4a1 1 0 112 0v5h1.5a1.5 1.5 0 011.5 1.5V17a5 5 0 01-5 5H9a5 5 0 01-5-5v-6.5A1.5 1.5 0 015.5 9H7V3a1 1 0 112 0v6h2V3a1 1 0 011-1z" />
            </svg>

            {/* Pill */}
            <div
              className={`w-14 sm:w-16 h-7 sm:h-8 rounded-full border ${
                rightIsRed
                  ? "bg-gradient-to-r from-red-600 via-rose-500 to-red-700 border-red-300 shadow-[0_0_15px_#ef4444]"
                  : "bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 border-blue-300 shadow-[0_0_15px_#3b82f6]"
              } transition-all duration-500 flex items-center justify-between px-2 transform rotate-[25deg]`}
            >
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter opacity-80 select-none">
                {rightIsRed ? "RED" : "BLUE"}
              </span>
              <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            </div>
          </button>
          <span className="text-xs font-mono text-zinc-400 font-semibold">
            {rightIsRed ? "RED PILL" : "BLUE PILL"}
          </span>
        </div>
      </div>

      {/* Message Output */}
      {activeMessage && (
        <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono text-center animate-fade-in max-w-lg z-10">
          {activeMessage}
        </div>
      )}
    </div>
  );
}
