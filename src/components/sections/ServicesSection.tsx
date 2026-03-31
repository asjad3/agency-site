"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Full-Stack Development",
    description: "Custom web applications built with modern frameworks. We handle everything from database design to deployment.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    icon: "code",
  },
  {
    title: "Progressive Web Apps",
    description: "Native-quality experiences that run everywhere. Offline support, push notifications, and app store distribution.",
    stack: ["Service Workers", "Capacitor", "TWA", "iOS"],
    icon: "devices",
  },
  {
    title: "Process Automation",
    description: "Replace manual workflows with intelligent systems. API integrations, data pipelines, and workflow orchestration.",
    stack: ["Python", "n8n", "Custom APIs", "Webhooks"],
    icon: "auto_awesome",
  },
  {
    title: "AI Integration",
    description: "Practical machine learning and LLM integration. Chat interfaces, document processing, and predictive features.",
    stack: ["OpenAI", "LangChain", "Embeddings", "RAG"],
    icon: "psychology",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-surface border border-border p-8 md:p-12 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      {/* Animated background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/0 via-brand/0 to-brand/0 group-hover:from-brand/[0.02] group-hover:via-brand/[0.05] group-hover:to-brand/[0.02] transition-all duration-500" />

      {/* Animated border */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-brand to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-brand to-transparent" />
      </div>

      {/* Icon */}
      <div className="relative mb-8">
        <motion.div
          className="w-14 h-14 border border-border flex items-center justify-center group-hover:border-brand transition-colors duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <span className="material-symbols-outlined text-2xl text-text-secondary group-hover:text-brand transition-colors">
            {service.icon}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <h3 className="relative text-2xl md:text-3xl font-display mb-4 group-hover:text-brand transition-colors duration-300">
        {service.title}
      </h3>
      <p className="relative text-text-secondary mb-8 leading-relaxed font-light">
        {service.description}
      </p>

      {/* Tech stack */}
      <div className="relative flex flex-wrap gap-2">
        {service.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 bg-surface-alt text-xs font-mono text-text-muted border border-border group-hover:border-brand/30 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 100 L100 100 L100 0 Z" fill="url(#corner-gradient)" />
          <defs>
            <linearGradient id="corner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section bg-surface-alt">
      <div className="container">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="brand-line" />
          <span className="section-label">Services</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
