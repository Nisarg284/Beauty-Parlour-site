"use client";

import { useEffect, useState } from "react";
import RevealText from "./RevealText";
import GoldStroke from "./GoldStroke";
import PlaceholderImage from "./PlaceholderImage";
import { client } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.image";

const LOCAL_ABOUT = {
  eyebrow: "The Atelier",
  heading: "Makeup as a quiet form of storytelling.",
  portrait: null,
  paragraphs: [
    "Amara began as a single chair in a small studio, and a conviction that bridal makeup should feel less like a transformation and more like a revealing — of the face someone already has, sharpened by light, texture, and a very steady hand.",
    "Every booking begins with a consultation, not a checklist. Skin is studied under the same light it will be seen in. Palettes are built around the outfit, the venue, and the hundred photographs that will outlive the day itself.",
  ],
  quoteText: "Good makeup disappears into good lighting. Great makeup survives it.",
  quoteAuthor: "Founder, Amara Atelier",
};

export default function About() {
  const [data, setData] = useState(LOCAL_ABOUT);

  useEffect(() => {
    client
      .fetch(`*[_type == "about"][0]`)
      .then((res) => {
        if (res) {
          setData({
            eyebrow: res.eyebrow || LOCAL_ABOUT.eyebrow,
            heading: res.heading || LOCAL_ABOUT.heading,
            portrait: res.portrait || null,
            paragraphs: res.paragraphs && res.paragraphs.length > 0 ? res.paragraphs : LOCAL_ABOUT.paragraphs,
            quoteText: res.quoteText || LOCAL_ABOUT.quoteText,
            quoteAuthor: res.quoteAuthor || LOCAL_ABOUT.quoteAuthor,
          });
        }
      })
      .catch(() => {
        // Fallback to local default data
      });
  }, []);

  return (
    <section id="story" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-10 md:px-10">
        <div className="md:sticky md:top-24 md:h-[70vh]">
          <RevealText className="h-full overflow-hidden rounded-sm">
            <PlaceholderImage
              src={data.portrait ? urlForImage(data.portrait).url() : undefined}
              label="Portrait — replace with atelier / founder photo, 4:5"
              className="aspect-[4/5] md:aspect-auto"
            />
          </RevealText>
        </div>

        <div className="flex flex-col justify-center">
          <RevealText>
            <span className="font-accent text-lg text-gold-light">{data.eyebrow}</span>
          </RevealText>

          <RevealText delay={0.1}>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">
              {data.heading}
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            <GoldStroke width={140} className="my-8" />
          </RevealText>

          <RevealText delay={0.25} className="space-y-6 font-body text-ivory/75">
            {data.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </RevealText>

          <RevealText delay={0.35} className="mt-10 border-l border-gold/40 pl-6">
            <p className="font-accent text-2xl leading-snug text-gold-light">
              &ldquo;{data.quoteText}&rdquo;
            </p>
            <p className="mt-3 font-body text-xs uppercase tracking-widest2 text-ivory/50">
              {data.quoteAuthor}
            </p>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
