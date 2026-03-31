"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "@/components/HeroBackground";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Background */}
      <HeroBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background pointer-events-none z-[1]" />

      <div className="container relative z-10">
        <motion.div
          style={{ y: y1, opacity }}
          className="max-w-5xl"
        >
          {/* Label */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="brand-line" />
            <span className="section-label">Digital Growth Partners</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-10 leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We build software
            <br />
            <span className="text-text-secondary">that helps you</span>
            <br />
            <span className="gradient-text">grow.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            H2 is a development studio focused on full-stack applications,
            process automation, and intelligent systems. We partner with
            ambitious companies to ship products that move metrics.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <a href="#contact" className="btn btn-primary">
              Start a project
            </a>
            <a href="#work" className="btn btn-secondary">
              See our work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          style={{ y: y2, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-brand to-transparent" />
          <span className="section-label text-xs">Scroll</span>
        </motion.div>

      </div>
    </section>
  );
}
