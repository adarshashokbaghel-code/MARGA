import { Archetypes } from "@/components/landing/archetypes";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Modules } from "@/components/landing/modules";
import { Stages } from "@/components/landing/stages";
import { Vision } from "@/components/landing/vision";
import { HeroDemo } from "@/components/ui/hero-demo";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <HeroDemo />
        <Modules />
        <Stages />
        <Archetypes />
        <Vision />
      </main>
      <Footer />
    </div>
  );
}
