"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section id="newsletter" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
          The Skinpiens Journal
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Clinical insights, without the clinical jargon
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-pretty">
          Barrier science, eczema research and new formulation drops. One email a
          month. No stinging, ever.
        </p>

        {done ? (
          <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium">
            <Check className="h-4 w-4 text-theme-accent" />
            Welcome to the Journal — check your inbox.
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@skinpiens.com"
              className="h-11 rounded-full px-4"
              aria-label="Email address"
            />
            <Button type="submit" className="h-11 gap-2 rounded-full">
              <Send className="h-4 w-4" />
              Subscribe
            </Button>
          </form>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          By subscribing you agree to our privacy policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
