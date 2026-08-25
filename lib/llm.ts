import { generateArticle } from "./generator";
import type { Article } from "./articles";

export interface GenerateResult {
  article: Article;
  source: "llm" | "local";
}

export async function generateWithFallback(topic?: string): Promise<GenerateResult> {
  const apiBase =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://skinpiens.vercel.app";

  try {
    const res = await fetch(`${apiBase}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: topic ?? null }),
    });

    if (!res.ok) throw new Error("API " + res.status);
    const data = await res.json();

    if (data.parseError || data.error) throw new Error("parse error");

    const article: Article = {
      slug: `generated-${Date.now()}`,
      title: data.title ?? "Untitled",
      kicker: data.kicker ?? "AI draft",
      category: data.category ?? "Supplement",
      date: new Date()
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .map((d, i) => (i === 1 ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(d) - 1] : d))
        .join(" "),
      readTime: "3 min",
      excerpt: `${data.body?.[0]?.text?.slice(0, 100) ?? data.title ?? ""}…`,
      cover: "/editorial/hero.jpg",
      accent: "#a65a2f",
      body: data.body ?? [{ text: "Empty response" }],
    };

    return { article, source: data.source ?? "llm" };
  } catch {
    return { article: generateArticle(), source: "local" };
  }
}
