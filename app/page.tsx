"use client";

import { Fragment, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { CartSheet } from "@/components/ui/cart-sheet";
import { SkinQuizDialog } from "@/components/ui/skin-quiz-dialog";
import { Hero } from "@/components/sections/hero";
import { ActivesMarquee, TrustBar } from "@/components/sections/marquee";
import { ProductGrid } from "@/components/sections/product-grid";
import { StoriesSection } from "@/components/sections/stories";
import { IngredientsSection } from "@/components/sections/ingredients";
import { QuizBanner } from "@/components/sections/quiz-banner";
import { Newsletter } from "@/components/sections/newsletter";
import { Manifesto } from "@/components/sections/manifesto";
import { RitualStrip } from "@/components/sections/ritual-strip";
import { FAQSection } from "@/components/sections/faq";
import { useTheme } from "@/components/providers/theme-provider";

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const { themeDef } = useTheme();

  const sections: Record<string, React.ReactNode> = {
    hero: <Hero onConsult={() => setQuizOpen(true)} />,
    marquee: <ActivesMarquee />,
    trust: <TrustBar />,
    products: <ProductGrid />,
    ritual: <RitualStrip />,
    ingredients: <IngredientsSection />,
    stories: <StoriesSection />,
    faq: <FAQSection />,
    manifesto: <Manifesto />,
    quiz: <QuizBanner onConsult={() => setQuizOpen(true)} />,
    newsletter: <Newsletter />,
  };

  return (
    <>
      <Header onConsult={() => setQuizOpen(true)} />
      <main className="flex-1">
        {themeDef.order.map((id) => (
          <Fragment key={id}>{sections[id]}</Fragment>
        ))}
      </main>
      <Footer />

      <SkinQuizDialog open={quizOpen} onOpenChange={setQuizOpen} />
      <CartSheet />
      <ThemeSwitcher />
    </>
  );
}
