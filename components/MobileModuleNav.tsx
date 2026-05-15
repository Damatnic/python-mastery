"use client";

import { useEffect } from "react";
import type { Module } from "@/lib/types";
import { Sidebar } from "./Sidebar";

interface MobileModuleNavProps {
  open: boolean;
  onClose: () => void;
  modules: Module[];
  completedLessons: Set<string>;
}

export function MobileModuleNav({ open, onClose, modules, completedLessons }: MobileModuleNavProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="module navigation"
        className={`absolute left-0 top-0 bottom-0 w-[85vw] max-w-xs bg-card border-r border-border shadow-2xl transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-border font-mono text-xs">
          <span className="text-muted-foreground"># lessons</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="close navigation"
          >
            close
          </button>
        </div>
        <div className="h-[calc(100%-2.5rem)] overflow-hidden">
          <Sidebar modules={modules} completedLessons={completedLessons} />
        </div>
      </div>
    </div>
  );
}
