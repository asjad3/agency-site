"use client";

import { Navigation, Footer } from "@/components";
import {
  HeroSection,
  ServicesSection,
  WorkSection,
  AboutSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
