"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { withBase } from "@/lib/base-path";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section id="newsletter" className="border-b border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <p className="micro text-muted-foreground">[09] The Journal</p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="display text-[clamp(2.4rem,5.6vw,4.8rem)]">
              Clinical insights,
              <br />
              <em className="text-accent">without the jargon.</em>
            </h2>

            {done ? (
              <p className="micro mt-10 flex items-center gap-3 border-t border-foreground/20 pt-5 text-foreground">
                <Check className="h-4 w-4 text-accent" />
                Welcome to the Journal — check your inbox.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-10 max-w-xl">
                <div className="flex items-center gap-4 border-b border-foreground/40 pb-3 focus-within:border-foreground">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@skinpiens.com"
                    aria-label="Email address"
                    className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/30 transition-colors hover:bg-foreground hover:text-background"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="micro mt-4 text-muted-foreground">
                  One email a month · Barrier science & new drops · No stinging
                </p>
              </form>
            )}
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Barrier science, eczema research and new formulation drops — written
              by the pharmacists who compound them.
            </p>
            <a
              href={withBase("/journal")}
              className="micro link-draw mt-6 inline-flex items-center gap-2 whitespace-nowrap text-foreground"
            >
              Read the Journal <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
