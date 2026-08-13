"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GoldStroke from "./GoldStroke";
import RevealText from "./RevealText";
import { client } from "@/lib/sanity.client";

const LOCAL_QUOTES = [
  {
    quote:
      "Amara understood my skin better than I did. Twelve hours, three outfit changes, zero touch-ups needed.",
    name: "Riya M.",
    role: "Bride, December Wedding",
  },
  {
    quote:
      "The most collaborative artist I've worked with on set. She reads light like a cinematographer.",
    name: "Kabir S.",
    role: "Photographer",
  },
  {
    quote:
      "My mother, my sister, and I all sat in that chair the same morning. Three completely different faces, one unmistakable hand.",
    name: "Naina P.",
    role: "Bride, Sangeet & Reception",
  },
];

export default function Testimonials() {
  const [quotes, setQuotes] = useState(LOCAL_QUOTES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "testimonial"] | order(order asc)`)
      .then((data) => {
        if (data && data.length > 0) {
          setQuotes(data);
        }
      })
      .catch(() => {
        // Fallback to local default data
      });
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, [quotes]);

  const activeQuote = quotes[index] || quotes[0];

  return (
    <section id="testimonials" className="relative bg-emerald py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <RevealText>
          <span className="font-display text-7xl leading-none text-gold/40">&ldquo;</span>
        </RevealText>

        <div className="relative h-[320px] sm:h-[240px] md:h-[200px] flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {activeQuote && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-accent text-2xl leading-snug text-ivory md:text-3xl">
                  {activeQuote.quote}
                </p>
                <GoldStroke width={100} className="mx-auto my-6" />
                <p className="font-body text-xs uppercase tracking-widest2 text-gold-light">
                  {activeQuote.name}
                </p>
                <p className="font-body text-xs text-ivory/50">{activeQuote.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {quotes.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-gold" : "w-1.5 bg-ivory/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
