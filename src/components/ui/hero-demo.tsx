import { Hero } from "@/components/ui/animated-hero";
import { HeroBackground } from "@/components/ui/hero-background";

function HeroDemo() {
  return (
    <HeroBackground>
      <div className="block">
        <Hero />
      </div>
    </HeroBackground>
  );
}

export { HeroDemo };
