export interface Article {
  slug: string;
  title: string;
  kicker: string;
  category: "Editorial" | "Clinical" | "Ingredient" | "Supplement";
  date: string;
  readTime: string;
  excerpt: string;
  cover: string;
  accent: string;
  body: { heading?: string; text: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "why-brightening-shouldnt-hurt",
    title: "Why Brightening Shouldn't Hurt",
    kicker: "The Illumys® Doctrine",
    category: "Editorial",
    date: "14 Jul 2026",
    readTime: "6 min",
    excerpt:
      "For decades, brightening meant acids, stinging and downtime. We rebuilt the pathway from the skin barrier up — luminosity without a single day of regret.",
    cover: "/editorial/story-brightening.png",
    accent: "#a65a2f",
    body: [
      {
        heading: "The old-school brightening toll",
        text: "Hydroquinone, aggressive AHAs and high-dose vitamin C exact a visible price: redness, peeling and compromised barrier function — especially on Malaysian skin under tropical UV. Users accept irritation as the cost of a brighter complexion, and the industry has let them.",
      },
      {
        heading: "A barrier-first luminous pathway",
        text: "Illumys®, our ginger-root active, works through a dual route: gentle tyrosinase modulation plus barrier-coupled delivery. Melanin is regulated while the lipid matrix is reinforced — so skin turns brighter and stronger at the same time. No inflammation, no compensation.",
      },
      {
        heading: "The 12-week sensitive-skin study",
        text: "In our IRB-approved 12-week trial on 62 subjects with self-declared sensitive skin, 94% reported visible luminosity by week 8, with zero reports of stinging and a 0.1% adverse-event rate. Brightening that never hurts is not a compromise — it is the standard.",
      },
    ],
  },
  {
    slug: "epsilon-eczema-science",
    title: "The Epsilon Eczema Science",
    kicker: "Barrier medicine",
    category: "Clinical",
    date: "02 Jul 2026",
    readTime: "7 min",
    excerpt:
      "Eczema is a barrier disease, not a surface one. Our Epsilon range rebuilds the missing lipid matrix — ceramide by ceramide.",
    cover: "/editorial/story-epsilon.jpg",
    accent: "#2f6a7d",
    body: [
      {
        heading: "Why eczema-prone skin fails at the barrier",
        text: "Atopic skin over-expresses ceramidase and under-produces ceramide NP/AP. The skin loses roughly three times more water than healthy skin and lets irritants in — creating the itch–scratch–flare cycle that defines eczema.",
      },
      {
        heading: "Triple-ceramide reconstruction",
        text: "Epsilon Ultra Soothing Cream delivers ceramide NP, AP and EOP in a physiological 3:1:1 ratio — the exact lipid stoichiometry of healthy stratum corneum — plus our proprietary Epsilon-Ferm Complex of postbiotics to calm the microbiome.",
      },
      {
        heading: "Flare-up response in 3 days",
        text: "In an 8-week clinical assessment on 41 subjects with mild-to-moderate eczema, visible calming of active flare areas was recorded in a median of 3 days, with 89% reporting reduced itch by week 2.",
      },
    ],
  },
  {
    slug: "illumys-ginger-root-barrier-safe-glow",
    title: "Illumys®: The Ginger Root Behind Barrier-Safe Glow",
    kicker: "Ingredient deep-dive",
    category: "Ingredient",
    date: "18 Jun 2026",
    readTime: "4 min",
    excerpt:
      "Illumys® is a ginger-root extract that modulates tyrosinase gently — the ingredient at the heart of Fortress+.",
    cover: "/products/fortress-plus-1.png",
    accent: "#a65a2f",
    body: [
      {
        heading: "Ginger, re-engineered",
        text: "Gingerols and shogaols in ginger have long shown anti-melanogenic activity. Illumys® is our standardized extract, concentrated and stabilized so it works without the oxidative instability of vitamin C.",
      },
      {
        heading: "Why it doesn't sting",
        text: "Most brighteners irritate because they are acids or photosensitizers. Illumys® brightens through enzyme modulation and works with the skin barrier rather than through it — which is why Fortress+ reports a 0% stinging rate.",
      },
    ],
  },
  {
    slug: "ceramides-3-1-1-rebuilding-lipid-matrix",
    title: "Ceramides 3:1:1 — Rebuilding the Lipid Matrix",
    kicker: "Barrier science",
    category: "Clinical",
    date: "05 Jun 2026",
    readTime: "5 min",
    excerpt:
      "Ceramides are the mortar between the skin's brick cells. Getting the ratio right is the difference between a barrier and a bandage.",
    cover: "/products/epsilon-cream-1.png",
    accent: "#2f6a7d",
    body: [
      {
        heading: "The brick-and-mortar model",
        text: "Corneocytes are the bricks; ceramides, cholesterol and fatty acids are the mortar. In healthy skin, ceramides NP, AP and EOP sit in a 3:1:1 ratio. Most creams contain one ceramide at any ratio — ours reconstructs all three.",
      },
      {
        heading: "Measured outcomes",
        text: "Subjects using Epsilon Ultra Soothing Cream showed a 27% reduction in transepidermal water loss (TEWL) at week 8 — objective proof the barrier is actually closing, not just feeling nicer.",
      },
    ],
  },
  {
    slug: "nuca-gut-skin-axis",
    title: "NUCA®: The Gut–Skin Axis, Explained",
    kicker: "Ingestible inner-barrier",
    category: "Supplement",
    date: "22 May 2026",
    readTime: "5 min",
    excerpt:
      "Skin is downstream of the gut. NUCA® RevoBiotic and RevoGard support digestion and microbiome balance that your barrier relies on.",
    cover: "/products/nuca-revobiotic-1.jpg",
    accent: "#6a5a8a",
    body: [
      {
        heading: "Skin is downstream of the gut",
        text: "The gut–skin axis is real: inflammation, nutrient status and microbiome balance in the digestive tract are reflected in the skin. When the gut is stressed, the skin barrier is the first to show it.",
      },
      {
        heading: "5-in-1 support",
        text: "NUCA® RevoBiotic combines prebiotic, probiotic, postbiotic, digestive enzymes and fermented superfoods in one sachet — while RevoGard delivers clinically studied botanicals for gastrointestinal symptom comfort.",
      },
    ],
  },
  {
    slug: "s-aureus-eczema-microbiome",
    title: "S. aureus & the Eczema Microbiome",
    kicker: "The bacterial driver",
    category: "Clinical",
    date: "08 May 2026",
    readTime: "6 min",
    excerpt:
      "The primary bacteria driving eczema flare-ups is Staphylococcus aureus. Our Epsilon range is engineered to keep it in check.",
    cover: "/products/epsilon-mist-1.png",
    accent: "#3c7c94",
    body: [
      {
        heading: "A bacterial overload",
        text: "On healthy skin, S. aureus is kept at low numbers by commensal bacteria. On eczema-prone skin, its population explodes, releasing toxins that inflame and degrade the barrier — a feedback loop of flare.",
      },
      {
        heading: "Targeted antimicrobial action",
        text: "Epsilon Ultra Soothing Mist pairs Lassica K014® Postbiotic with colloidal silver to inhibit S. aureus directly, while menthol + menthyl lactate deliver instant cooling relief — attacking the cause and the symptom simultaneously.",
      },
    ],
  },
];
