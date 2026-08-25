import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { ARTICLES } from "@/lib/articles";
import { ArticlePageView } from "@/components/journal/article-page-view";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article not found" };
  return {
    title: `${article.title} — The Skinpiens Journal`,
    description: article.excerpt.slice(0, 155),
  };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();
  return <SiteChrome><ArticlePageView article={article} /></SiteChrome>;
}
