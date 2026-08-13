"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

/**
 * Simple hash to turn a label string into a deterministic index.
 */
function hashLabel(label: string): number {
  let h = 0;
  for (let i = 0; i < label.length; i++) {
    h = (h * 31 + label.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const LOCAL_IMAGES: Record<string, string> = {
  "bridal makeup": "/images/bridal.png",
  "editorial & photoshoot": "/images/editorial.png",
  "party & reception glam": "/images/party.png",
  "pre-bridal rituals": "/images/prep.png",
  "draping & styling": "/images/styling.png",
  "destination & travel": "/images/destination.png",
  "portfolio 01": "/images/party.png",
  "portfolio 02": "/images/editorial.png",
  "portfolio 03": "/images/styling.png",
  "portfolio 04": "/images/wedding.png",
  "portfolio 05": "/images/campaign.png",
  "portfolio 06": "/images/prep.png",
  "feed 01": "/images/bridal.png",
  "feed 02": "/images/editorial.png",
  "feed 03": "/images/party.png",
  "feed 04": "/images/prep.png",
  "feed 05": "/images/wedding.png",
  "feed 06": "/images/campaign.png",
  "feed 07": "/images/styling.png",
  "feed 08": "/images/destination.png",
};

const getLocalImageSrc = (label?: string): string | null => {
  if (!label) return null;
  const lowerLabel = label.trim().toLowerCase();
  
  if (LOCAL_IMAGES[lowerLabel]) {
    return LOCAL_IMAGES[lowerLabel];
  }
  
  if (lowerLabel.includes("portrait")) {
    return "/images/campaign.png";
  }
  if (lowerLabel.includes("bridal")) {
    return "/images/bridal.png";
  }
  if (lowerLabel.includes("editorial")) {
    return "/images/editorial.png";
  }
  if (lowerLabel.includes("party")) {
    return "/images/party.png";
  }
  if (lowerLabel.includes("sangeet") || lowerLabel.includes("wedding")) {
    return "/images/wedding.png";
  }
  
  // Cycle through local images deterministically
  const images = [
    "/images/bridal.png",
    "/images/editorial.png",
    "/images/party.png",
    "/images/prep.png",
    "/images/wedding.png",
    "/images/campaign.png",
    "/images/styling.png",
    "/images/destination.png",
  ];
  const index = hashLabel(label) % images.length;
  return images[index];
};

/**
 * Renders a real <img> when `src` is provided. If no src,
 * uses a mapped high-quality local image to populate visual placeholders.
 */
export default function PlaceholderImage({
  src,
  alt = "",
  label,
  className = "",
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageSrc = src || getLocalImageSrc(label) || "/images/campaign.png";

  if (errored) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald via-emerald-deep to-ink text-gold-light/50 ${className}`}
      >
        <Camera size={28} strokeWidth={1.2} />
        {label && (
          <span className="px-4 text-center font-body text-[10px] uppercase tracking-widest2">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-emerald via-emerald-deep to-ink" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={(el) => {
          if (el && el.complete) {
            setLoaded(true);
          }
        }}
        src={imageSrc}
        alt={alt || label || ""}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
