import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsAppBar } from "@/components/layout/StickyWhatsAppBar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ProductModal } from "@/components/product/ProductModal";
import { PageView } from "@/components/analytics/PageView";

import { Hero } from "@/components/sections/Hero";
import { FeaturedScents } from "@/components/sections/FeaturedScents";
import { MoodSelector } from "@/components/sections/MoodSelector";
import { WhyUs } from "@/components/sections/WhyUs";
import { ScentFinder } from "@/components/sections/ScentFinder";
import { ProductCollection } from "@/components/sections/ProductCollection";
import { BangaloreStory } from "@/components/sections/BangaloreStory";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gifting } from "@/components/sections/Gifting";
import { SocialProof } from "@/components/sections/SocialProof";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <PageView />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <FeaturedScents />
        <MoodSelector />
        <WhyUs />
        <ScentFinder />
        <ProductCollection />
        <BangaloreStory />
        <HowItWorks />
        <Gifting />
        <SocialProof />
        <InstagramGrid />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <StickyWhatsAppBar />
      <ProductModal />
    </>
  );
}
