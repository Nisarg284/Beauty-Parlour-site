"use client";

import { useMotionValue, useTransform, motion } from "framer-motion";
import ScrollScrubVideo from "./ScrollScrubVideo";
import GoldStroke from "./GoldStroke";

const WORD = "AMARA";

export default function Hero() {
  // A MotionValue instead of React state: Framer Motion writes it straight to
  // the DOM style on each scroll frame, bypassing React's render cycle
  // entirely. With useState here, every scroll tick (up to 60x/sec) would
  // re-render the whole Hero tree — including all the letter animations
  // below — at the same moment the video is trying to seek, competing for
  // the main thread and adding to the "laggy" feel.
  const progress = useMotionValue(0);

  // Overlay text fades and lifts away during the first third of the scrub,
  // so the video takes full focus once the story gets moving.
  const overlayOpacity = useTransform(progress, (p) => Math.max(0, 1 - p * 3.2));
  const overlayY = useTransform(progress, (p) => p * -60);

  return (
    <section id="top" className="relative">
      <ScrollScrubVideo
        src="/videos/hero-scrub.mp4"
        poster="/images/hero-poster.jpg"
        pinHeight={6}
        onProgress={(p) => progress.set(p)}
      >
        <motion.div
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
          style={{ opacity: overlayOpacity, y: overlayY }}
        >
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
        </motion.div>
      </ScrollScrubVideo>
    </section>
  );
}