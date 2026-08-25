import { ARTICLES, type Article } from "./articles";
import { POOLED_ARTICLES } from "./article-pool";

type Block = Article["body"][number];

interface Pools {
  hooks: string[];
  facts: string[];
  bullets: string[];
  tips: string[];
  ctas: string[];
  general: string[];
}

const TOPICS = [
  "Vitamin D", "关节", "膝盖", "防晒", "SPF", "湿疹", "类固醇", "玻尿酸",
  "胶原蛋白", "Glucosamine", "保健品", "肠道", "抗性淀粉", "血糖",
  "免疫力", "皮肤", "Chia Seed", "生酮", "肌肉", "黑眼圈", "钙", "发炎",
];

const TEMPLATES = [
  (t: string) => `${t}的真相，和你想的不一样`,
  (t: string) => `为什么你的${t}一直没效？`,
  (t: string) => `${t}入门第一课`,
  (t: string) => `关于${t}，药师想说的三件事`,
  (t: string) => `${t}：你补对了吗？`,
  (t: string) => `别再乱买${t}产品了`,
];

const COVERS = [
  "/editorial/story-brightening.png",
  "/editorial/story-epsilon.jpg",
  "/editorial/hero.jpg",
  "/products/fortress-plus-1.png",
  "/products/epsilon-cream-1.png",
];

const ACCENTS = ["#a65a2f", "#2f6a7d", "#a62f4f", "#2fa66b", "#6a5a8a", "#b07c2f"];
const CATS: Article["category"][] = ["Supplement", "Ingredient", "Clinical"];

function isEmojiLed(s: string): boolean {
  return /^[\u2190-\u2BFF\u{1F000}-\u{1FAFF}\uFE0F\u2705\u274C\u2714\u2753\u2757•▪️]/u.test(s.trim());
}

let pools: Pools | null = null;

function buildPools(): Pools {
  const p: Pools = { hooks: [], facts: [], bullets: [], tips: [], ctas: [], general: [] };
  const seen = new Set<string>();
  for (const a of ARTICLES) {
    for (const block of a.body) {
      for (const raw of `${block.text}`.split("\n")) {
        for (const s of raw.split(/(?<=[。！？!?])/)) {
          const line = s.trim();
          if (line.length < 8 || line.length > 120 || seen.has(line)) continue;
          seen.add(line);
          if (/团购|留言区|评论区|见留言|欢迎留言|敲碗/.test(line)) p.ctas.push(line);
          else if (/小贴士|Tips|药师Tips/.test(line)) p.tips.push(line);
          else if (/[？?]$/.test(line) || /^(很多人|如果你|为什么|怎样|如何|你有没有|相信很多)/.test(line))
            p.hooks.push(line.replace(/[。]$/, ""));
          else if (/研究|数据|%|％|显示|调查|临床|SEANUTS|发现/.test(line)) p.facts.push(line);
          else p.general.push(line);
        }
      }
      for (const raw of `${block.text}`.split("\n")) {
        const line = raw.trim();
        if (isEmojiLed(line) && line.length >= 4 && line.length <= 60 && !p.bullets.includes(line))
          p.bullets.push(line);
      }
    }
  }
  return p;
}

function getPools(): Pools {
  if (!pools) pools = buildPools();
  return pools;
}

const pick = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

function pickRel(arr: string[], topic: string, used: Set<string>): string {
  const rel = arr.filter((s) => s.includes(topic) && !used.has(s));
  const fallback = arr.filter((s) => !used.has(s));
  const chosen = pick(rel.length ? rel : fallback.length ? fallback : arr);
  used.add(chosen);
  return chosen;
}

export function generateArticle(): Article {
  const p = getPools();
  const topic = pick(TOPICS);
  const used = new Set<string>();

  const title = pick(TEMPLATES)(topic);
  const hook = pickRel(p.hooks, topic, used);
  const fact1 = pickRel(p.facts, topic, used);
  const fact2 = pickRel(p.general, topic, used);
  const bullets: string[] = [];
  while (bullets.length < 3 && bullets.length < p.bullets.length - 1) {
    const b = pickRel(p.bullets, topic, used);
    if (!bullets.includes(b)) bullets.push(b);
  }
  const tip = pickRel([...p.tips, ...p.general], topic, used);
  const cta = pickRel(p.ctas, topic, used);

  const body: Block[] = [
    { text: `${hook}\n\n${fact1}` },
    { heading: `${topic}，先搞懂这件事`, text: `${fact2}${fact2.endsWith("。") ? "" : "。"}` },
    { heading: "记住这三点", text: bullets.join("\n") },
    { heading: "药师小贴士 💊", text: tip },
    { text: cta },
    {
      heading: "⚠️ 关于本文",
      text: "这篇草稿由本站的风格生成器根据 Journal 既有文章自动拼合而成，仅供灵感与参考，并非医学建议。如有健康问题，请咨询专业医生或药剂师。",
    },
  ];

  const excerpt = `${topic} — ${hook}`;
  const today = new Date();
  const date = `${String(today.getDate()).padStart(2, "0")} ${
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][today.getMonth()]
  } ${today.getFullYear()}`;

  return {
    slug: `generated-${Date.now()}`,
    title,
    kicker: "AI draft · trained on Kris notes",
    category: pick(CATS),
    date,
    readTime: "2 min",
    excerpt,
    cover: pick(COVERS),
    accent: pick(ACCENTS),
    body,
  };
}

let poolIndex = 0;
const usedPoolSlugs = new Set<string>();

export function generateFromPool(): Article {
  const available = POOLED_ARTICLES.filter((a) => !usedPoolSlugs.has(a.slug));
  if (available.length === 0) {
    usedPoolSlugs.clear();
    poolIndex = 0;
    return generateFromPool();
  }
  const idx = Math.floor(Math.random() * available.length);
  const picked = available[idx];
  usedPoolSlugs.add(picked.slug);
  const today = new Date();
  const date = `${String(today.getDate()).padStart(2, "0")} ${
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][today.getMonth()]
  } ${today.getFullYear()}`;
  return {
    ...picked,
    slug: `generated-${Date.now()}-${poolIndex++}`,
    date,
    kicker: "AI draft · trained on Kris notes",
  };
}
