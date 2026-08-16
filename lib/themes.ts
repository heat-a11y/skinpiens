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
];

export function getTheme(id: string): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
