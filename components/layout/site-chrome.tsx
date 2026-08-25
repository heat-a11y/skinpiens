"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { CartSheet } from "@/components/ui/cart-sheet";
import { SkinQuizDialog } from "@/components/ui/skin-quiz-dialog";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <Header onConsult={() => setQuizOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SkinQuizDialog open={quizOpen} onOpenChange={setQuizOpen} />
      <CartSheet />
      <ThemeSwitcher />
    </>
  );
}
