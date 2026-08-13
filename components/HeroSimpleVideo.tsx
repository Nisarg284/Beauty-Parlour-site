"use client";

import { motion } from "framer-motion";
import GoldStroke from "./GoldStroke";

const WORD = "AMARA";

export default function HeroSimpleVideo() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Autoplay looping background video */}
      <video
        src="/videos/hero-scrub.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* Luxury overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink/80 z-10" />

      {/* Content overlay */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-accent text-lg text-gold-light md:text-xl"
        >
          Bridal &amp; Editorial Makeup Atelier
        </motion.p>

        <h1 className="flex font-display text-[18vw] leading-none text-ivory md:text-[9rem]" aria-label={WORD}>
          {WORD.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.0 }}
          className="mt-6"
        >
          <GoldStroke width={200} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.0 }}
          className="mt-6 max-w-sm font-body text-xs uppercase tracking-widest2 text-ivory/70"
        >
          Vadodara · By Appointment
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.0 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <span className="font-body text-[10px] uppercase tracking-widest2 text-ivory/60">
            Scroll to begin
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-full bg-gold"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
