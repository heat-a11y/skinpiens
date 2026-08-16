import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Inter,
  Manrope,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SKINPIENS — Clinical Skincare · Botanical Science",
  description:
    "Skinpiens is a clinical skincare and botanical science house. Brightening that never hurts, eczema-grade barrier repair, and ingestible inner-barrier support.",
};

/**
 * Applies the saved (or ?theme= requested) design before first paint so the
 * page never flashes the wrong theme, even on a fully static export.
 */
const THEME_BOOT_SCRIPT = `(function(){try{
var valid=["navy-cream","aesop","the-ordinary","la-roche-posay","rhode-glossier","le-labo-apothecary","sk-ii-zen","augustinus-bader","beauty-of-joseon","youth-to-the-people","curology-direct","chanel","hermes","dior","kiehls","biotherm","sulwhasoo","shiseido","lamer","olay","fresh"];
var m=location.search.match(/[?&]theme=([a-z0-9-]+)/);
var t=m?m[1]:localStorage.getItem("skinpiens-theme")||"navy-cream";
if(valid.indexOf(t)===-1)t="navy-cream";
document.documentElement.setAttribute("data-theme",t);
}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="navy-cream"
      className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} ${cormorant.variable} ${manrope.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
