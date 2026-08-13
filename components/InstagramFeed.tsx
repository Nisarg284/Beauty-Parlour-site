import { Instagram, Heart } from "lucide-react";
import RevealText from "./RevealText";
import GoldStroke from "./GoldStroke";
import PlaceholderImage from "./PlaceholderImage";

const TILES = Array.from({ length: 8 }, (_, i) => ({
  label: `Feed ${String(i + 1).padStart(2, "0")}`,
}));

export default function InstagramFeed() {
  return (
    <section id="feed" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
        <RevealText>
          <span className="font-accent text-lg text-gold-light">From the Studio</span>
          <h2 className="mt-2 font-display text-4xl text-ivory md:text-5xl">@amara.beauty</h2>
          <GoldStroke width={140} className="mx-auto my-8" />
        </RevealText>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {TILES.map((tile, i) => (
            <RevealText key={tile.label} delay={(i % 4) * 0.06}>
              <a
                href="#"
                data-cursor="Instagram"
                className="group relative block aspect-square overflow-hidden"
              >
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  <PlaceholderImage label={tile.label} />
                </div>

                {/* corner frame, draws in on hover */}
                {[
                  "left-2 top-2 border-l border-t",
                  "right-2 top-2 border-r border-t",
                  "left-2 bottom-2 border-l border-b",
                  "right-2 bottom-2 border-r border-b",
                ].map((pos) => (
                  <span
                    key={pos}
                    className={`pointer-events-none absolute h-4 w-4 border-gold opacity-0 transition-all duration-500 group-hover:opacity-100 ${pos}`}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/40 group-hover:opacity-100">
                  <Heart size={18} className="text-gold-light" strokeWidth={1.4} />
                </div>
              </a>
            </RevealText>
          ))}
        </div>

        <RevealText delay={0.2}>
          <a
            href="#"
            data-cursor="Follow"
            className="mt-12 inline-flex items-center gap-2 border-b border-gold/50 pb-1 font-body text-xs uppercase tracking-widest2 text-ivory transition-colors hover:text-gold-light"
          >
            <Instagram size={14} />
            Follow the Atelier
          </a>
        </RevealText>
      </div>
    </section>
  );
}
