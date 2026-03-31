"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

const projects = [
  {
    title: "FinTech Dashboard",
    description: "Real-time trading platform with sub-millisecond data updates and complex charting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    tags: ["React", "WebSockets", "D3.js"],
  },
  {
    title: "E-commerce Platform",
    description: "Headless commerce solution handling 100k+ daily orders with custom inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Healthcare Portal",
    description: "HIPAA-compliant patient portal with telemedicine integration and automated scheduling.",
    image: "https://images.unsplash.com/photo-1576091160550-217358c7db81?w=1200&q=80",
    tags: ["React", "Node.js", "WebRTC"],
  },
];

function ProjectCard({ project, index, reversed = false }: { project: typeof projects[0]; index: number; reversed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.8,
            staggerChildren: 0.2,
            delay: index * 0.1,
          },
        },
      }}
    >
      {/* Image */}
      <motion.div
        className={`aspect-[4/3] bg-surface overflow-hidden ${reversed ? "lg:order-2" : ""}`}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className={reversed ? "lg:order-1" : ""}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <motion.h3
          className="text-3xl md:text-4xl lg:text-5xl font-display mb-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="text-text-secondary text-lg mb-8 leading-relaxed font-light"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-surface text-xs font-mono text-text-muted border border-border"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16 lg:mb-24"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="brand-line" />
          <span className="section-label">Selected Work</span>
        </motion.div>

        {/* Projects */}
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
