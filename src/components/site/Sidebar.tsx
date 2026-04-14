"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import {
  CalendarCheck2,
  Camera,
  CircleDollarSign,
  House,
  ImageIcon,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
} from "lucide-react";

import type { MediaAsset, NavItem, SocialItem } from "@/src/lib/cms/types";

type SidebarProps = {
  logo?: MediaAsset;
  siteName: string;
  navItems: NavItem[];
  socialItems: SocialItem[];
  contactEmail?: string;
  footerText?: string;
};

const getNavIcon = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized.includes("home")) return House;
  if (normalized.includes("about")) return UserRound;
  if (normalized.includes("portfolio")) return Camera;
  if (normalized.includes("pricing")) return CircleDollarSign;
  if (normalized.includes("gallery")) return ImageIcon;
  if (normalized.includes("book")) return CalendarCheck2;
  return ImageIcon;
};

export function Sidebar({
  logo,
  siteName,
  navItems,
  socialItems,
  contactEmail,
  footerText,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 1023px)").matches;
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!panelRef.current || !asideRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const panel = panelRef.current;
    const aside = asideRef.current;

    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (desktop) {
      gsap.to(aside, {
        width: isCollapsed ? 112 : 320,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: 0.2,
        ease: "power1.out",
      });
      return;
    }

    gsap.killTweensOf(panel);
    if (isCollapsed) {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.out",
      });
    } else {
      gsap.to(panel, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [isCollapsed]);

  return (
    <aside
      ref={asideRef}
      className={`absolute inset-x-0 top-0 z-40 h-16 w-full border-b border-zinc-200 bg-white px-4 sm:h-18 sm:px-5 lg:inset-auto lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:border-b-0 lg:border-r lg:bg-white lg:p-8 dark:border-zinc-700/80 dark:bg-zinc-900/90 lg:dark:bg-zinc-900/60 ${
        isCollapsed ? "lg:overflow-visible" : "lg:overflow-hidden"
      }`}
    >
      <div className="flex h-full items-center justify-between lg:h-auto">
        <div className={`flex items-center transition-opacity ${isCollapsed ? "lg:opacity-0 lg:invisible" : ""}`}>
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alt}
              width={105}
              height={32}
              className="h-auto w-auto dark:invert sm:w-[112px] lg:w-[136px]"
            />
          ) : (
            <Image
              src="/logo.png"
              alt={siteName}
              width={100}
              height={42}
              className="h-auto w-auto dark:invert sm:w-[112px] lg:w-[136px]"
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed((state) => !state)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 sm:h-9 sm:w-9"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" aria-hidden />
          ) : (
            <PanelLeftClose className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>

      <div
        ref={panelRef}
        className={`absolute left-0 right-0 top-full mt-0 flex max-h-[calc(100vh-4rem)] flex-col border-b border-zinc-200 bg-white px-4 pb-4 pt-3 shadow-lg sm:max-h-[calc(100vh-4.5rem)] sm:px-5 lg:static lg:mt-8 lg:min-h-0 lg:max-h-none lg:flex-1 lg:border-b-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:shadow-none dark:border-zinc-700/80 dark:bg-zinc-900/95 lg:dark:bg-transparent ${
          isCollapsed
            ? "h-0 overflow-hidden border-b-0 px-0 pb-0 pt-0 opacity-0 shadow-none lg:h-auto lg:overflow-visible lg:border-b-0 lg:px-0 lg:pb-0 lg:pt-0 lg:opacity-100"
            : "overflow-hidden opacity-100"
        } ${isCollapsed ? "pointer-events-none lg:pointer-events-auto" : ""}`}
      >
        <div className="min-h-0 flex-1">
          <nav className="h-full">
            <ul
              className={`${isCollapsed ? "space-y-3 overflow-visible" : "space-y-4 overflow-y-auto"} h-full text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-600`}
            >
              {navItems.map((item) => (
                <li key={item.href} className="group relative">
                  <a
                    href={item.href}
                    className={`inline-flex items-center gap-3 rounded-md ${
                      isCollapsed ? "h-9 w-9 justify-center" : "px-2 py-1.5"
                    } text-zinc-600 transition-all duration-200 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 ${isCollapsed ? "hover:bg-zinc-900/5 dark:hover:bg-zinc-100/10" : "hover:bg-transparent"}`}
                    aria-label={item.label}
                  >
                    {isCollapsed
                      ? (() => {
                          const Icon = getNavIcon(item.label);
                          return <Icon className="h-4 w-4 shrink-0" aria-hidden />;
                        })()
                      : null}
                    {!isCollapsed ? (
                      <span className="uppercase tracking-[0.24em] after:mt-1 after:block after:h-px after:w-0 after:bg-zinc-400 after:transition-all after:duration-200 group-hover:after:w-full">
                        {item.label}
                      </span>
                    ) : null}
                  </a>
                  {isCollapsed ? (
                    <span className="pointer-events-none absolute left-12 top-1/2 z-50 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] tracking-normal text-white opacity-0 shadow transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                      {item.label}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-auto space-y-4 border-t border-zinc-200 pt-5 text-xs leading-relaxed text-zinc-500 dark:border-zinc-700/70 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            {socialItems.map((item) => {
              const label = item.label.toLowerCase();
              const SocialIcon = label.includes("insta") ? FaInstagram : FaPinterestP;
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                  aria-label={item.label}
                  title={item.label}
                >
                  <SocialIcon className="h-4 w-4" aria-hidden />
                </Link>
              );
            })}
          </div>
          {!isCollapsed && contactEmail ? <p>For inquiries: {contactEmail}</p> : null}
          {!isCollapsed && footerText ? <p>{footerText}</p> : null}
        </div>
      </div>
    </aside>
  );
}
