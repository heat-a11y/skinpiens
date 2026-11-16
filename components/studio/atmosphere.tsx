"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * Global art-direction layer for the studio theme:
 * scroll progress hairline, film grain, and a cursor ring that scales up
 * into a label over anything marked with data-cursor.
 */
export function Atmosphere() {
  const { theme } = useTheme();
  const studio = theme === "studio";
  const [progress, setProgress] = useState(0);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!studio) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ring.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      if (target) {
        el.dataset.active = "true";
        el.dataset.label = target.dataset.cursor || "View";
      } else {
        el.dataset.active = "false";
        el.dataset.label = "";
      }
    };

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.dataset.cursor = "on";
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      delete document.documentElement.dataset.cursor;
    };
  }, [studio]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[75] h-px bg-transparent"
      >
        <div
          className="h-full bg-foreground transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {studio && <div aria-hidden className="grain-layer" />}
      {studio && (
        <div ref={ring} aria-hidden className="cursor-ring" data-active="false" />
      )}
    </>
  );
}
