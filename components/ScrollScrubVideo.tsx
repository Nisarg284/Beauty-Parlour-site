"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollScrubVideoProps {
  /** Path to the video file, e.g. /videos/hero-scrub.mp4 */
  src: string;
  poster?: string;
  /** How much extra scroll distance to give the scrub, as a multiple of viewport height. 3 = 300vh of scroll to play the whole clip. */
  pinHeight?: number;
  className?: string;
  /** Content pinned on top of the video for the duration of the scrub (headline, eyebrow, scroll cue, etc). */
  children?: React.ReactNode;
  /** Fires on every scrub frame with progress from 0 to 1, so overlay content can react to the same scroll math as the video. */
  onProgress?: (progress: number) => void;
}

/**
 * Binds a <video>'s playhead directly to scroll progress within a pinned section.
 * Scrolling down moves the video forward; scrolling back up reverses it —
 * uses a non-blocking seek queue to ensure the browser's hardware decoder
 * does not lag or choke during fast scrolling.
 */
export default function ScrollScrubVideo({
  src,
  poster,
  pinHeight = 3,
  className = "",
  children,
  onProgress,
}: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let trigger: ScrollTrigger | undefined;

    const setup = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      setReady(true);

      let isSeeking = false;
      let targetTime = 0;

      const seekVideo = () => {
        if (isSeeking) return;

        // Skip seek if it is extremely close to the current playhead
        if (Math.abs(video.currentTime - targetTime) < 0.02) return;

        isSeeking = true;
        video.currentTime = targetTime;
      };

      const handleSeeked = () => {
        isSeeking = false;
        seekVideo();
      };

      video.addEventListener("seeked", handleSeeked);

      // ScrollTrigger pins the section and provides smooth, throttled scroll progress updates
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${pinHeight * 100}%`,
        pin: true,
        scrub: 0.2, // Small scrub buffer for smooth catch-up without seek backlog
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          onProgress?.(progress);
          
          targetTime = progress * video.duration;
          seekVideo();
        },
      });

      return () => {
        video.removeEventListener("seeked", handleSeeked);
      };
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      trigger?.kill();
      video.removeEventListener("loadedmetadata", setup);
    };
  }, [pinHeight, onProgress]);

  return (
    <div ref={sectionRef} className={`relative h-[100dvh] w-full overflow-hidden bg-ink ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {!ready && poster && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink/80" />
      {children}
    </div>
  );
}
