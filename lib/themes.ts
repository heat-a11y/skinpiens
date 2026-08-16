export type HeroVariant =
  | "editorial" // YTTP — clean western botanical
  | "editorial-center" // Aesop — apothecary serif, centered
  | "split" // The Ordinary — technical lab
  | "clinical" // La Roche-Posay — dermatological
  | "soft-center" // Rhode — dewy glow
  | "dark-editorial" // Le Labo — vintage batch stamps
  | "japanese" // SK-II — dense J-beauty zen
  | "luxury" // Augustinus Bader — sapphire gold
  | "frosted" // Beauty of Joseon — glass skin
  | "clinic"; // Curology — interactive clinic

export type ProductLayout = "grid-2" | "grid-3" | "grid-4" | "carousel";

export type SectionId =
  | "hero"
  | "marquee"
  | "trust"
  | "products"
  | "ritual"
  | "ingredients"
  | "stories"
  | "faq"
  | "manifesto"
  | "quiz"
  | "newsletter";

export type Tone =
  | "editorial"
  | "technical"
  | "clinical"
  | "soft"
  | "vintage"
  | "japanese"
  | "luxury"
  | "frosted"
  | "scandinavian"
  | "clinic";

export interface ThemeDef {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  hero: HeroVariant;
  products: ProductLayout;
  order: SectionId[];
  tone: Tone;
  swatches: string[];
  fonts: string;
}

export const THEMES: ThemeDef[] = [
  {
    id: "navy-cream",
    name: "Skinpiens",
    brand: "Navy + Cream",
    tagline: "Clinical luxury · Cream canvas · Champagne accents",
    description:
      "The locked Skinpiens brand system — cream canvas, navy typography and CTAs, champagne-gold accents. Product packaging supplies the colour.",
    hero: "editorial",
    products: "grid-3",
    tone: "editorial",
    order: ["hero", "trust", "products", "ingredients", "stories", "quiz", "newsletter"],
    swatches: ["#f7f3ea", "#0b1f33", "#c9a45c", "#e8e0d3"],
    fonts: "Playfair Display / Inter",
  },
  {
    id: "aesop",
    name: "Aesop",
    brand: "The Apothecary Archival",
    tagline: "Earthy beige · Editorial type · Pharmacist narrative",
    description:
      "Warm paper tones, an old-world serif and a quiet, apothecary-grade manifesto. Sparse, centered, numbered.",
    hero: "editorial-center",
    products: "grid-2",
    tone: "editorial",
    order: ["hero", "manifesto", "products", "stories", "ingredients", "newsletter"],
    swatches: ["#f3eee3", "#3e3a2e", "#a65a2f", "#e7dfcf"],
    fonts: "Playfair Display / Inter",
  },
  {
    id: "the-ordinary",
    name: "The Ordinary",
    brand: "Clinical Formulation Lab",
    tagline: "Monochrome · Active ingredient callouts",
    description:
      "Zero-frills white lab sheets, raw black type and a dense 4-up ingredient grid with dose callouts.",
    hero: "split",
    products: "grid-4",
    tone: "technical",
    order: ["hero", "marquee", "products", "ingredients", "quiz", "newsletter"],
    swatches: ["#ffffff", "#0a0a0a", "#d8e33e", "#f2f2f2"],
    fonts: "Space Grotesk / Inter",
  },
  {
    id: "la-roche-posay",
    name: "La Roche-Posay",
    brand: "Dermatological Barrier",
    tagline: "Medical white · Cyan clinical indicators",
    description:
      "Pharmacy-clean surfaces, trust-blue signals, a clinical indicator panel and an eczema-care FAQ.",
    hero: "clinical",
    products: "grid-3",
    tone: "clinical",
    order: ["hero", "trust", "products", "faq", "quiz", "newsletter"],
    swatches: ["#ffffff", "#0098d3", "#4cc3e6", "#eaf6fc"],
    fonts: "Inter / Inter",
  },
  {
    id: "rhode-glossier",
    name: "Rhode / Glossier",
    brand: "Clean Dewy Glow",
    tagline: "Soft blushes · Glassmorphism · Quick adds",
    description:
      "Blush-soft surfaces, pill-shaped CTAs and a swipeable quick-add product carousel.",
    hero: "soft-center",
    products: "carousel",
    tone: "soft",
    order: ["hero", "marquee", "products", "trust", "stories", "newsletter"],
    swatches: ["#fdf6f1", "#d4869b", "#f2c7d1", "#f9e9ec"],
    fonts: "Manrope / Manrope",
  },
  {
    id: "le-labo-apothecary",
    name: "Le Labo",
    brand: "Botanical Heritage",
    tagline: "Dark slate · Vintage batch stamps",
    description:
      "Nocturnal slate, aged amber wax seals, batch-stamp product numbers and a two-column vintage catalogue.",
    hero: "dark-editorial",
    products: "grid-2",
    tone: "vintage",
    order: ["hero", "products", "stories", "newsletter"],
    swatches: ["#1e2622", "#c9a06b", "#a9b7a0", "#2e3b34"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "sk-ii-zen",
    name: "SK-II",
    brand: "J-Beauty Minimalist",
    tagline: "Fluid water ripples · Ritual flows",
    description:
      "Pearlescent calm and ink restraint, but full-packed: vertical type, ritual rails and dense stat modules.",
    hero: "japanese",
    products: "grid-3",
    tone: "japanese",
    order: ["hero", "ritual", "products", "stories", "newsletter"],
    swatches: ["#f5f3ee", "#2b3a4a", "#7fb4c9", "#e9e7e0"],
    fonts: "Space Grotesk / Inter",
  },
  {
    id: "augustinus-bader",
    name: "Augustinus Bader",
    brand: "Hyper-Science Luxury",
    tagline: "Deep sapphire · Brushed gold · Trial data",
    description:
      "Midnight sapphire with brushed-gold accents, a split luxury hero and clinical trial tables.",
    hero: "luxury",
    products: "grid-3",
    tone: "luxury",
    order: ["hero", "ingredients", "products", "stories", "newsletter"],
    swatches: ["#0a1628", "#c9a24b", "#6e89b5", "#10213a"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "beauty-of-joseon",
    name: "Beauty of Joseon",
    brand: "K-Beauty Glass Skin",
    tagline: "Frosted glass · Routine carousels",
    description:
      "Rice-ivory minimalism, frosted translucent cards, routine carousels and hydration stats.",
    hero: "frosted",
    products: "carousel",
    tone: "frosted",
    order: ["hero", "ritual", "products", "ingredients", "newsletter"],
    swatches: ["#fbf7f0", "#51706b", "#e6c3bb", "#f2eae0"],
    fonts: "Manrope / Inter",
  },
  {
    id: "youth-to-the-people",
    name: "Youth To The People",
    brand: "Modern Botanical",
    tagline: "Eco-luxury sage · Clean formula index",
    description:
      "Fresh-sage surfaces, a clean formula index and honest Scandinavian-style botanical labelling.",
    hero: "editorial",
    products: "grid-3",
    tone: "scandinavian",
    order: ["hero", "trust", "products", "ingredients", "stories", "newsletter"],
    swatches: ["#f4f7ef", "#4e6647", "#a8c44e", "#e6edda"],
    fonts: "Manrope / Inter",
  },
  {
    id: "curology-direct",
    name: "Curology",
    brand: "Interactive Virtual Clinic",
    tagline: "Skin quiz hero · Tailored routine generator",
    description:
      "A direct-to-consumer clinic: quiz-first hero with a floating treatment-plan card and tailored routines.",
    hero: "clinic",
    products: "grid-3",
    tone: "clinic",
    order: ["hero", "quiz", "products", "trust", "newsletter"],
    swatches: ["#ffffff", "#6c5ce7", "#4dd0a4", "#f1effd"],
    fonts: "DM Sans / Inter",
  },

  {
    id: "chanel",
    name: "Chanel",
    brand: "Parisian Noir & Ivoire",
    tagline: "Black ivory · Gold rules · Sharp editorial",
    description: "Couture restraint — sharp black-on-ivory, hairline rules and gold thread through a tight editorial collection.",
    hero: "editorial-center",
    products: "grid-3",
    tone: "editorial",
    order: ['hero', 'products', 'stories', 'newsletter'],
    swatches: ["#f7f5f0", "#141414", "#b98a2f", "#e9e4dc"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "hermes",
    name: "Hermès",
    brand: "Signature Orange",
    tagline: "Orange & cream · Fashion-forward grid",
    description: "The house orange against cream — a bold two-column fashion collection with a marquee of craft.",
    hero: "editorial",
    products: "grid-2",
    tone: "editorial",
    order: ['hero', 'marquee', 'products', 'trust', 'newsletter'],
    swatches: ["#fbf6ef", "#f05a28", "#3a2e25", "#f0e6d8"],
    fonts: "Playfair Display / Inter",
  },
  {
    id: "dior",
    name: "Dior",
    brand: "Platinum Couture",
    tagline: "Pearl · Silver · Black",
    description: "Platinum pearl surfaces and silver-grey couture — a soft-centred hero with a swipeable runway carousel.",
    hero: "soft-center",
    products: "carousel",
    tone: "editorial",
    order: ['hero', 'products', 'stories', 'newsletter'],
    swatches: ["#f6f5f3", "#1a1a1a", "#b88a3c", "#b8b6ae"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "kiehls",
    name: "Kiehl's",
    brand: "Apothecary Red",
    tagline: "White clinical · Signature red",
    description: "The old New York apothecary — clean white, heritage red and a no-nonsense skincare FAQ.",
    hero: "clinical",
    products: "grid-3",
    tone: "clinical",
    order: ['hero', 'trust', 'products', 'faq', 'newsletter'],
    swatches: ["#fbf8f3", "#d22730", "#2c2c2c", "#f1eae0"],
    fonts: "Playfair Display / Inter",
  },
  {
    id: "biotherm",
    name: "Biotherm",
    brand: "Aqua Source",
    tagline: "Deep water blue · Biotic glow",
    description: "Aqua-first clinical — water-blue primaries over pale glassy surfaces and an ingredients rail.",
    hero: "frosted",
    products: "grid-3",
    tone: "clinical",
    order: ['hero', 'marquee', 'products', 'ingredients', 'newsletter'],
    swatches: ["#f4f9fa", "#0084a9", "#6fc8dc", "#ddeef2"],
    fonts: "Inter / Inter",
  },
  {
    id: "sulwhasoo",
    name: "Sulwhasoo",
    brand: "Hanbang Oxblood & Gold",
    tagline: "Oxblood heritage · Gold hanbang",
    description: "Korean heritage luxury — oxblood, gold and a dense ritual-first arrangement with vertical accents.",
    hero: "japanese",
    products: "grid-2",
    tone: "japanese",
    order: ['hero', 'ritual', 'products', 'stories', 'newsletter'],
    swatches: ["#faf6ef", "#7a2431", "#b98a3f", "#f0e6d8"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "shiseido",
    name: "Shiseido",
    brand: "Rouge Minimal",
    tagline: "White canvas · Signature red",
    description: "Japanese precision — a technical lab split, red rules and a dense four-up product index.",
    hero: "split",
    products: "grid-4",
    tone: "technical",
    order: ['hero', 'marquee', 'products', 'ingredients', 'newsletter'],
    swatches: ["#ffffff", "#e11845", "#141414", "#f5f0f0"],
    fonts: "Space Grotesk / Inter",
  },
  {
    id: "lamer",
    name: "La Mer",
    brand: "Oceanic Miracle",
    tagline: "Seafoam & champagne",
    description: "Deep-ocean luxury — sea-green and champagne, a sculpted hero and clinical trial tables.",
    hero: "luxury",
    products: "grid-3",
    tone: "luxury",
    order: ['hero', 'products', 'ingredients', 'stories', 'newsletter'],
    swatches: ["#f5f1e8", "#1f4e46", "#b98a3c", "#e8e4d8"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "olay",
    name: "Olay",
    brand: "Gold & Clinical Blue",
    tagline: "Glow gold · Clinical blue",
    description: "Mainstream clinical glow — navy-blue, gold and a scandinavian-clean product index.",
    hero: "soft-center",
    products: "grid-4",
    tone: "scandinavian",
    order: ['hero', 'marquee', 'products', 'trust', 'newsletter'],
    swatches: ["#fcf9f2", "#0e4c92", "#c79a3c", "#f0e9db"],
    fonts: "Manrope / Inter",
  },
  {
    id: "fresh",
    name: "Fresh",
    brand: "Sugar Botanical",
    tagline: "Sugar brown · Botanical green",
    description: "Clean botanical — sugar-brown, botanical green and a swipeable ritual of honest formulas.",
    hero: "editorial",
    products: "carousel",
    tone: "scandinavian",
    order: ['hero', 'products', 'trust', 'stories', 'newsletter'],
    swatches: ["#f8f4ea", "#8c5a2b", "#6b7f4e", "#efe6d5"],
    fonts: "Playfair Display / Inter",
  },
];

export function getTheme(id: string): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
