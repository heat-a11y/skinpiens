# SKINPIENS — Clinical Skincare · Botanical Science

A modern e-commerce skincare showcase built with **Next.js 16 (App Router)**, TypeScript, Tailwind CSS v4, Framer Motion, and shadcn/Base UI.

The storefront features an **11-in-1 Design Overhaul Switcher** — a floating toolbar that restyles the entire site under 11 distinct aesthetic architectures, with zero page reloads.

## 11-in-1 Theme Switcher

Click the palette button to preview Skinpiens under:

| Theme | Architecture |
| --- | --- |
| **Skinpiens (Navy + Cream)** | The locked brand system — cream canvas, navy type/CTAs, champagne accents |
| **Aesop** | The Apothecary Archival — earthy beige, editorial serif, pharmacist narrative |
| **The Ordinary** | Clinical Formulation Lab — monochrome, active-ingredient callouts |
| **La Roche-Posay** | Dermatological Barrier — medical white/cyan, eczema indicators |
| **Rhode / Glossier** | Clean Dewy Glow — soft blushes, glassmorphism, quick adds |
| **Le Labo** | Botanical Heritage — dark slate, vintage batch-stamp accents |
| **SK-II** | J-Beauty Minimalist — fluid water ripples, ritual-based horizontal flows |
| **Augustinus Bader** | Hyper-Science Luxury — deep sapphire, brushed gold, trial data |
| **Beauty of Joseon** | K-Beauty Glass Skin — frosted glass, routine carousels |
| **Youth To The People** | Modern Botanical — eco-luxury sage, clean formula index |
| **Curology** | Interactive Virtual Clinic — skin-quiz hero, tailored routines |

Each theme is a self-contained CSS system (`data-theme` attribute on `<html>`) swapping palettes, typography (6 Google fonts), radii, and surfaces. Selections persist to `localStorage`.

## Product Data

- **Fortress+ Brightening Serum with Illumys®** — RM 128.00 (hero brightening active)
- **Epsilon Ultra Soothing Cream** — RM 90.00 (eczema-grade ceramide barrier repair)
- **Epsilon Ultra Soothing Mist** — RM 60.00 (instant redness relief)
- **Epsilon Barrier Restoring Ceramide Cleanser** — RM 50.00 (sulfate-free, pH 5.5)
- **Veragen POOG Collagen / NUCA Supplements** — ingestible inner-barrier support

## Features

- **Mega-menu header** (Skin · Eczema Range · Hair · Body · Supplement · Consult) with hover panel + mobile drawer
- **Product grid** with active-ingredient tags, concern badges, ratings, quick-add, and **Quick View** dialog
- **Cart sheet** with free-shipping progress bar (target RM 150), qty steppers, persisted cart
- **3-step Skin Consultation** diagnostic that builds a tailored regimen and adds it to the bag
- **Editorial & Clinical stories** — "Why Brightening Shouldn't Hurt" & "Epsilon Eczema Science"
- **Clean Formula Index** — actives with doses, clinical data table, and an interactive barrier-hydration meter
- Fully responsive: desktop, tablet, mobile

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Static export (GitHub Pages)

```bash
EXPORT=true NEXT_PUBLIC_BASE_PATH=/skinpiens npm run build
npx serve out
```

## Project Structure

```
app/                  # routes (page, layout)
components/
  layout/             # header (mega-menu), footer
  themes/             # ThemeSwitcher toolbar
  providers/          # theme + cart state
  sections/           # hero, product grid, stories, ingredients, quiz, newsletter
  ui/                 # shadcn/Base UI + product card, quick view, cart, quiz
lib/                  # product data, theme definitions, types
```
