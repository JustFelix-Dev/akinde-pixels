"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";
type ThemeToggleProps = {
  placement?: "floating" | "inline";
  className?: string;
};

const applyTheme = (theme: ThemeMode) => {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);
};

export function ThemeToggle({ placement = "floating", className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
    return saved ?? "light";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme-mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const isFloating = placement === "floating";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`items-center justify-center gap-1.5 rounded-full border border-zinc-300 bg-transparent uppercase text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white ${
        isFloating
          ? "fixed right-4 top-20 z-50 inline-flex h-10 px-3 text-[10px] tracking-[0.14em] lg:right-8 lg:top-6"
          : "inline-flex h-8 px-2.5 text-[10px] tracking-[0.14em] sm:h-9 sm:px-3"
      } ${className}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Dark mode active" : "Light mode active"}
    >
      {theme === "dark" ? <Moon className="h-3.5 w-3.5" aria-hidden /> : <Sun className="h-3.5 w-3.5" aria-hidden />}
      <span className={isFloating ? "" : "hidden sm:inline"}>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
