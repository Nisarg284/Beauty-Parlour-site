import RevealText from "./RevealText";
import GoldStroke from "./GoldStroke";
import PlaceholderImage from "./PlaceholderImage";

export default function About() {
  return (
    <section id="story" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-10 md:px-10">
        <div className="md:sticky md:top-24 md:h-[70vh]">
          <RevealText className="h-full overflow-hidden rounded-sm">
            <PlaceholderImage
              label="Portrait — replace with atelier / founder photo, 4:5"
              className="aspect-[4/5] md:aspect-auto"
            />
          </RevealText>
        </div>

        <div className="flex flex-col justify-center">
          <RevealText>
            <span className="font-accent text-lg text-gold-light">The Atelier</span>
          </RevealText>

          <RevealText delay={0.1}>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">
              Makeup as a quiet form of storytelling.
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            <GoldStroke width={140} className="my-8" />
          </RevealText>

          <RevealText delay={0.25} className="space-y-6 font-body text-ivory/75">
            <p>
              Amara began as a single chair in a small studio, and a conviction that
              bridal makeup should feel less like a transformation and more like a
              revealing — of the face someone already has, sharpened by light,
              texture, and a very steady hand.
            </p>
            <p>
              Every booking begins with a consultation, not a checklist. Skin is
              studied under the same light it will be seen in. Palettes are built
              around the outfit, the venue, and the hundred photographs that will
              outlive the day itself.
            </p>
          </RevealText>

          <RevealText delay={0.35} className="mt-10 border-l border-gold/40 pl-6">
            <p className="font-accent text-2xl leading-snug text-gold-light">
              &ldquo;Good makeup disappears into good lighting. Great makeup survives
              it.&rdquo;
            </p>
            <p className="mt-3 font-body text-xs uppercase tracking-widest2 text-ivory/50">
              Founder, Amara Atelier
            </p>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
