"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("idle");
      alert("Connection error. Please try again.");
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-5 pointer-events-none">
        <div className="absolute inset-0 border border-brand rounded-full animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          {/* Header */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="brand-line" />
            <span className="section-label">Contact</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's build something{" "}
            <span className="gradient-text">great.</span>
          </motion.h2>

          <motion.p
            className="text-text-secondary text-lg mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Tell us about your project. We'll respond within 24 hours with
            next steps and how we can help.
          </motion.p>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-border p-10"
            >
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-display mb-3">Message sent</h3>
              <p className="text-text-secondary font-light">
                We'll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-brand font-mono text-sm uppercase tracking-wider hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="john@company.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
                  Company
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="input"
                  placeholder="Acme Inc."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input resize-none"
                  placeholder="Tell us about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="btn btn-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
