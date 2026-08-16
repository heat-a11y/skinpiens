"use client";

import { useState } from "react";
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

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <Header onConsult={() => setQuizOpen(true)} />
      <main className="flex-1">
        <Hero onConsult={() => setQuizOpen(true)} />
        <ActivesMarquee />
        <TrustBar />
        <ProductGrid />
        <StoriesSection />
        <IngredientsSection />
        <QuizBanner onConsult={() => setQuizOpen(true)} />
        <Newsletter />
      </main>
      <Footer />

      <SkinQuizDialog open={quizOpen} onOpenChange={setQuizOpen} />
      <CartSheet />
      <ThemeSwitcher />
    </>
  );
}
