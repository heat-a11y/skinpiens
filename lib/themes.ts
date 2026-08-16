export interface ThemeDef {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  layout: "editorial" | "split" | "center" | "dark" | "clinic" | "ritual";
  swatches: string[];
  fonts: string;
}

export const THEMES: ThemeDef[] = [
  {
    id: "aesop",
    name: "Aesop",
    brand: "The Apothecary Archival",
    tagline: "Earthy beige · Editorial type · Pharmacist narrative",
    description:
      "Warm paper tones, an old-world serif and quiet, apothecary-grade storytelling.",
    layout: "editorial",
    swatches: ["#f3eee3", "#3e3a2e", "#a65a2f", "#e7dfcf"],
    fonts: "Playfair Display / Inter",
  },
  {
    id: "the-ordinary",
    name: "The Ordinary",
    brand: "Clinical Formulation Lab",
    tagline: "Monochrome · Active ingredient callouts",
    description:
      "Zero-frills white lab sheets, raw black type and technical ingredient labelling.",
    layout: "split",
    swatches: ["#ffffff", "#0a0a0a", "#d8e33e", "#f2f2f2"],
    fonts: "Space Grotesk / Inter",
  },
  {
    id: "la-roche-posay",
    name: "La Roche-Posay",
    brand: "Dermatological Barrier",
    tagline: "Medical white · Cyan clinical indicators",
    description:
      "Pharmacy-clean surfaces, trust-blue signals and eczema clinical indicators.",
    layout: "split",
    swatches: ["#ffffff", "#0098d3", "#4cc3e6", "#eaf6fc"],
    fonts: "Inter / Inter",
  },
  {
    id: "rhode-glossier",
    name: "Rhode / Glossier",
    brand: "Clean Dewy Glow",
    tagline: "Soft blushes · Glassmorphism · Quick adds",
    description:
      "Blush-soft gradients, frosted glass cards and a mobile-first quick-add cadence.",
    layout: "center",
    swatches: ["#fdf6f1", "#d4869b", "#f2c7d1", "#f9e9ec"],
    fonts: "Manrope / Manrope",
  },
  {
    id: "le-labo-apothecary",
    name: "Le Labo",
    brand: "Botanical Heritage",
    tagline: "Dark slate · Vintage batch stamps",
    description:
      "Nocturnal slate, aged amber wax seals and numbered batch-stamp detailing.",
    layout: "dark",
    swatches: ["#1e2622", "#c9a06b", "#a9b7a0", "#2e3b34"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "sk-ii-zen",
    name: "SK-II",
    brand: "J-Beauty Minimalist",
    tagline: "Fluid water ripples · Ritual flows",
    description:
      "Pearlescent calm, ink-black restraint and horizontal ritual-based flows.",
    layout: "ritual",
    swatches: ["#f5f3ee", "#2b3a4a", "#7fb4c9", "#e9e7e0"],
    fonts: "Space Grotesk / Inter",
  },
  {
    id: "augustinus-bader",
    name: "Augustinus Bader",
    brand: "Hyper-Science Luxury",
    tagline: "Deep sapphire · Brushed gold · Trial data",
    description:
      "Midnight sapphire with brushed-gold accents and rigorous clinical trial tables.",
    layout: "dark",
    swatches: ["#0a1628", "#c9a24b", "#6e89b5", "#10213a"],
    fonts: "Cormorant Garamond / Inter",
  },
  {
    id: "beauty-of-joseon",
    name: "Beauty of Joseon",
    brand: "K-Beauty Glass Skin",
    tagline: "Frosted glass · Routine carousels",
    description:
      "Rice-ivory minimalism, frosted translucent cards and hydration-stat focus.",
    layout: "ritual",
    swatches: ["#fbf7f0", "#51706b", "#e6c3bb", "#f2eae0"],
    fonts: "Manrope / Inter",
  },
  {
    id: "youth-to-the-people",
    name: "Youth To The People",
    brand: "Modern Botanical",
    tagline: "Eco-luxury sage · Clean formula index",
    description:
      "Fresh-sage surfaces, honest botanical labelling and a clean formula index.",
    layout: "editorial",
    swatches: ["#f4f7ef", "#4e6647", "#a8c44e", "#e6edda"],
    fonts: "Manrope / Inter",
  },
  {
    id: "curology-direct",
    name: "Curology",
    brand: "Interactive Virtual Clinic",
    tagline: "Skin quiz hero · Tailored routine generator",
    description:
      "A direct-to-consumer clinic: quiz-first hero and personally tailored routines.",
    layout: "clinic",
    swatches: ["#ffffff", "#6c5ce7", "#4dd0a4", "#f1effd"],
    fonts: "DM Sans / Inter",
  },
];

export function getTheme(id: string): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
