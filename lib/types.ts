export type Category =
  | "Skin"
  | "Eczema Range"
  | "Hair"
  | "Body"
  | "Supplement"
  | "Consult";

export type SkinConcern =
  | "Brightening"
  | "Redness / Eczema"
  | "Barrier Repair"
  | "Sensitive"
  | "Dehydration"
  | "Aging";

export interface Product {
  id: string;
  slug: string;
  name: string;
  line: string;
  tagline: string;
  category: Category;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  format: string;
  ingredients: string[];
  badges: string[];
  concerns: SkinConcern[];
  skinTypes: string[];
  description: string;
  hero: boolean;
  image?: string;
  art: {
    from: string;
    to: string;
    accent: string;
    label: string;
  };
}
