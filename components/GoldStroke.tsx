"use client";

import { motion } from "framer-motion";

/**
 * The recurring signature mark of the site — a single unbroken brush stroke,
 * evoking the sweep of an eyeliner or foundation brush. Used sparingly as a
 * section divider / underline so it stays a mark of distinction, not decoration.
 */
export default function GoldStroke({
  className = "",
  width = 220,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 220 12"
      width={width}
      height={Math.round((width / 220) * 12)}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M2 8.5C34 2.5 71 1 110 5.5C149 10 186 3.5 218 6"
        stroke="var(--gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.4, ease: [0.45, 0, 0.15, 1] }}
      />
    </svg>
  );
}
