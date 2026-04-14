"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

const applyTheme = (theme: ThemeMode) => {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);
};

export function ThemeToggle() {
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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-4 top-20 z-50 inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-zinc-300 bg-transparent px-3 text-[10px] uppercase tracking-[0.14em] text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900 lg:right-8 lg:top-6 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Dark mode active" : "Light mode active"}
    >
      {theme === "dark" ? <Moon className="h-3.5 w-3.5" aria-hidden /> : <Sun className="h-3.5 w-3.5" aria-hidden />}
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
