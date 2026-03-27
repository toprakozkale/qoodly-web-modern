"use client";

import { HeroSection } from "@/components/HeroSection";
import { WhyQoodlySection } from "@/components/WhyQoodlySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";

export default function Home() {
  return (
    <main className="relative text-[#f5f5f5] overflow-x-hidden">
      <HeroSection />
      <WhyQoodlySection />
      <FeaturesSection />
      <ToolsSection />
      <ShowcaseSection />
    </main>
  );
}
