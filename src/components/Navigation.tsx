"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <svg viewBox="0 0 48 48" className="w-full h-full">
              <circle cx="24" cy="24" r="22" stroke="#A64B5B" strokeWidth="2" fill="none"/>
              <text x="14" y="32" fontFamily="Arial Black" fontSize="18" fontWeight="900" fill="#A64B5B">H2</text>
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight">H2</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="btn btn-primary"
          >
            Start a project
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-surface border-t border-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="container py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left text-text-secondary hover:text-text-primary py-2"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full btn btn-primary mt-4"
            >
              Start a project
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
