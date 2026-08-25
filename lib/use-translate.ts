"use client";

import { useState, useCallback, useRef } from "react";

export type TranslateLang = "en" | "ms" | "ta";

const LANG_LABELS: Record<TranslateLang, string> = {
  en: "EN",
  ms: "BM",
  ta: "TA",
};

const LANG_NAMES: Record<TranslateLang, string> = {
  en: "English",
  ms: "Bahasa Melayu",
  ta: "Tamil",
};

const cache = new Map<string, string>();

async function translateText(text: string, target: TranslateLang): Promise<string> {
  const key = `${target}::${text}`;
  if (cache.has(key)) return cache.get(key)!;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const translated = data[0]?.map((s: [string]) => s[0]).join("") || text;
    cache.set(key, translated);
    return translated;
  } catch {
    cache.set(key, text);
    return text;
  }
}

export interface TranslatedBlock {
  heading?: string;
  text: string;
}

export function useTranslate() {
  const [lang, setLang] = useState<TranslateLang | null>(null);
  const [translated, setTranslated] = useState<TranslatedBlock[] | null>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const translate = useCallback(async (body: { heading?: string; text: string }[], target: TranslateLang) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLang(target);
    setLoading(true);
    try {
      const results: TranslatedBlock[] = [];
      for (const block of body) {
        const [headingT, textT] = await Promise.all([
          block.heading ? translateText(block.heading, target) : Promise.resolve(undefined),
          translateText(block.text, target),
        ]);
        results.push({ heading: headingT, text: textT });
      }
      setTranslated(results);
    } catch {
      setTranslated(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setLang(null);
    setTranslated(null);
    setLoading(false);
  }, []);

  return { lang, translated, loading, translate, clear, LANG_LABELS, LANG_NAMES };
}
