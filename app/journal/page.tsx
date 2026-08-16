import type { Metadata } from "next";
import { JournalPage } from "@/components/journal/journal-page";

export const metadata: Metadata = {
  title: "The Skinpiens Journal | SKINPIENS",
  description:
    "Barrier science, eczema research and the botanical actives behind every Skinpiens formula.",
};

export default function Journal() {
  return <JournalPage />;
}
