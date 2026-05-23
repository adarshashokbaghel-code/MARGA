import type { Metadata } from "next";

import { AboutPage } from "@/components/landing/about-page";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "About — Marga.me",
  description:
    "The science behind Marga: psychometric science, skill assessment, and psychological profiling for deep career self-knowledge.",
};

export default function About() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}
