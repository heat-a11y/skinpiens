import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Manrope,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { Atmosphere } from "@/components/studio/atmosphere";

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

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
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
var valid=["studio","navy-cream","aesop","the-ordinary","la-roche-posay","rhode-glossier","le-labo-apothecary","sk-ii-zen","augustinus-bader","beauty-of-joseon","youth-to-the-people","curology-direct","chanel","hermes","dior","kiehls","biotherm","sulwhasoo","shiseido","lamer","olay","fresh"];
var m=location.search.match(/[?&]theme=([a-z0-9-]+)/);
var t=m?m[1]:localStorage.getItem("skinpiens-theme-v2")||"studio";
if(valid.indexOf(t)===-1)t="studio";
document.documentElement.setAttribute("data-theme",t);
}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="studio"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} ${cormorant.variable} ${manrope.variable} ${dmSans.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CartProvider>
            <Atmosphere />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
