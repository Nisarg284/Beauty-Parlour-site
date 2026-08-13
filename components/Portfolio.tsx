"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlaceholderImage from "./PlaceholderImage";
import GoldStroke from "./GoldStroke";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { title: "Reception Glam, Vadodara", label: "Portfolio 01" },
  { title: "Editorial Test Shoot", label: "Portfolio 02" },
  { title: "South Indian Bridal", label: "Portfolio 03" },
  { title: "Destination Wedding, Udaipur", label: "Portfolio 04" },
  { title: "Campaign — Skin & Light", label: "Portfolio 05" },
  { title: "Sangeet Glam", label: "Portfolio 06" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1.0,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute left-0 top-16 z-10 px-6 md:px-10">
        <span className="font-accent text-lg text-gold-light">Selected Work</span>
        <h2 className="mt-2 font-display text-4xl text-ivory md:text-5xl">Portfolio</h2>
        <GoldStroke width={140} className="mt-6" />
      </div>

      <div
        ref={trackRef}
        className="flex h-[100dvh] w-max items-center gap-6 pl-6 pt-24 md:gap-10 md:pl-10"
      >
        {ITEMS.map((item) => (
          <div
            key={item.title}
            data-cursor="View"
            className="relative h-[62vh] w-[70vw] flex-shrink-0 overflow-hidden rounded-sm md:h-[68vh] md:w-[32vw]"
          >
            <PlaceholderImage label={item.label} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-6">
              <span className="font-body text-[10px] uppercase tracking-widest2 text-gold-light">
                {item.label}
              </span>
              <h3 className="mt-1 font-display text-xl text-ivory">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
