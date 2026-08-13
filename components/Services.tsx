"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import GoldStroke from "./GoldStroke";
import RevealText from "./RevealText";
import PlaceholderImage from "./PlaceholderImage";

const SERVICES = [
  {
    name: "Bridal Makeup",
    desc: "HD & airbrush application with draping assistance and a touch-up kit for the day.",
    price: "₹25,000 onward",
  },
  {
    name: "Editorial & Photoshoot",
    desc: "Camera-ready looks built for print, campaigns, and portfolios.",
    price: "₹12,000 onward",
  },
  {
    name: "Party & Reception Glam",
    desc: "Bold, luminous, and built to outlast the night.",
    price: "₹8,000 onward",
  },
  {
    name: "Pre-Bridal Rituals",
    desc: "Skin prep, brow shaping, and a trial session.",
    price: "₹6,000 onward",
  },
  {
    name: "Draping & Styling",
    desc: "Saree, lehenga, and dupatta draping by appointment.",
    price: "₹4,000 onward",
  },
  {
    name: "Destination & Travel",
    desc: "On-location artistry, anywhere the celebration takes you.",
    price: "On request",
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Viewport fixed coordinates for the floating preview
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { damping: 30, stiffness: 250, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Dynamically checks what is under the cursor on scroll, allowing
    // the active row to swap smoothly even if the mouse is stationary.
    const handleScroll = () => {
      const { x: curX, y: curY } = mouseRef.current;
      if (curX === 0 && curY === 0) return;

      const element = document.elementFromPoint(curX, curY);
      const row = (element as HTMLElement | null)?.closest?.("[data-service-index]");

      if (row) {
        setHovered(Number(row.getAttribute("data-service-index")));
      } else {
        setHovered(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [x, y]);

  return (
    <section
      id="services"
      className="relative bg-emerald-deep py-28 md:py-40"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <RevealText className="text-center">
          <span className="font-accent text-lg text-gold-light">The Menu</span>
          <h2 className="mt-4 font-display text-4xl text-ivory md:text-5xl">
            Services &amp; Pricing
          </h2>
          <GoldStroke width={140} className="mx-auto my-8" />
        </RevealText>

        <div className="relative mt-16">
          {SERVICES.map((s, i) => (
            <RevealText key={s.name} delay={i * 0.05}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-service-index={i}
                data-cursor="View"
                className="group flex flex-col gap-2 border-t border-gold/15 py-8 last:border-b md:flex-row md:items-baseline md:justify-between cursor-pointer transition-colors duration-300"
              >
                <div className="md:max-w-md transition-transform duration-300 group-hover:translate-x-2">
                  <h3 className="font-display text-2xl text-ivory transition-colors group-hover:text-gold-light md:text-3xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-ivory/60 transition-colors group-hover:text-ivory/80">
                    {s.desc}
                  </p>
                </div>
                <span className="font-body text-sm uppercase tracking-widest2 text-gold-light transition-all duration-300 group-hover:text-gold group-hover:scale-105">
                  {s.price}
                </span>
              </div>
            </RevealText>
          ))}

          {/* Floating Hover Preview Image (Fixed Position) */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "fixed",
                  left: springX,
                  top: springY,
                  x: 24, // Shift to the right of cursor
                  y: -140, // Shift above the cursor
                  pointerEvents: "none",
                  zIndex: 40,
                }}
                className="hidden md:block w-56 h-72 overflow-hidden rounded-sm border border-gold/30 shadow-2xl bg-ink/40"
              >
                {/* Overlay styling for extra luxury */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/20 z-10 pointer-events-none" />
                
                <PlaceholderImage
                  label={SERVICES[hovered].name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
