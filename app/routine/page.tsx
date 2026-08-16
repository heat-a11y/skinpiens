import type { Metadata } from "next";
import { RoutineBuilder } from "@/components/routine/routine-builder";

export const metadata: Metadata = {
  title: "Build Your Ritual | SKINPIENS",
  description:
    "Answer 3 quick questions and our virtual clinic builds a Skinpiens regimen tailored to your barrier, concerns and routine.",
};

export default function Routine() {
  return <RoutineBuilder />;
}
