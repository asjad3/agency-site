"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section bg-surface-alt relative overflow-hidden">
      {/* Animated background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 pointer-events-none">
        <motion.div
          className="w-full h-full border border-brand rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="brand-line" />
              <span className="section-label">About H2</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-10">
              We're a different kind of{" "}
              <span className="text-text-secondary">development</span>{" "}
              <span className="gradient-text">partner.</span>
            </h2>

            <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Most agencies sell hours. We sell outcomes. Every project starts
                with understanding your business goals, then we build the
                technology to get you there.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Our team spans full-stack engineering, DevOps, and AI
                integration. We've shipped everything from MVPs to enterprise
                platforms handling millions in transactions.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                When you work with H2, you get direct access to senior
                engineers who care about your success. No account managers,
                no junior devs learning on your dime.
              </motion.p>
            </div>
          </motion.div>

          {/* Right: Focus areas */}
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Full-Stack", desc: "End-to-end development" },
              { title: "Automation", desc: "Workflow optimization" },
              { title: "AI/ML", desc: "Intelligent systems" },
              { title: "Cloud", desc: "Scalable infrastructure" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="border-t border-border pt-6"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              >
                <div className="text-xl font-display mb-1">
                  <span className="gradient-text">{item.title}</span>
                </div>
                <div className="text-text-secondary font-light text-sm">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
