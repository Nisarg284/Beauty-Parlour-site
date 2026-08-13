# Amara — Bridal & Editorial Makeup Atelier

A premium, animation-driven Next.js site for a makeup artist / beauty studio.
Emerald & gold palette, editorial serif type, scroll-scrubbed hero video, and
micro-interactions throughout.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **GSAP + ScrollTrigger** — scroll-scrubbed video, pinned horizontal gallery
  (100% free as of April 2025, including ScrollTrigger — no license key needed)
- **Framer Motion** — reveals, hover states, custom cursor, magnetic button
- **Lenis** — inertia smooth-scroll, wired into GSAP's ticker

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

```
app/
  layout.tsx        fonts, global providers
  page.tsx           assembles all sections
  globals.css         tokens, resets, grain/scrollbar/cursor
components/
  Hero.tsx            scroll-scrubbed video + wordmark
  ScrollScrubVideo.tsx reusable "scroll drives video.currentTime" component
  Navbar.tsx           hide-on-scroll-down nav
  About.tsx, Services.tsx, Portfolio.tsx, Testimonials.tsx,
  InstagramFeed.tsx, Booking.tsx, Footer.tsx
  GoldStroke.tsx       the recurring brush-stroke signature motif
  RevealText.tsx       scroll-in-view reveal wrapper
  CustomCursor.tsx, MagneticButton.tsx    micro-interactions
  PlaceholderImage.tsx fallback tile until real photography is added
```

## How the "scroll drives video" effect works

`components/ScrollScrubVideo.tsx` pins its section for `pinHeight × 100vh`
of extra scroll (default `pinHeight={3}` → 300vh), then tweens the video's
`currentTime` from `0` to `duration` using GSAP's `scrub` option:

```js
gsap.to(video, {
  currentTime: video.duration,
  scrollTrigger: { trigger: section, scrub: 0.6, pin: true, ... }
});
```

Because the tween is bound to **scroll position**, not to a `play()` call,
scrolling down naturally advances the video and scrolling back up naturally
reverses it — there's no separate "play forward / play backward" logic to
write. You can reuse `<ScrollScrubVideo src="..." pinHeight={2}>` anywhere
else you'd like the same effect (e.g. a "the transformation" section).

## Adding your media

Drop files into `public/videos/` and `public/images/` using these names (or
update the `src` props in the components):

| File | Used in |
|---|---|
| `public/videos/hero-scrub.mp4` | Hero scroll-scrub |
| `public/images/hero-poster.jpg` | Hero fallback frame while video loads |
| Any image passed to `<PlaceholderImage src="...">` | About, Portfolio, Feed |

**Important — encode the scrub video for smooth seeking.** A normal H.264
export only places keyframes every few seconds, which makes frame-by-frame
scrubbing stutter. Re-encode with a keyframe on every frame:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 18 -preset slow \
  -g 1 -keyint_min 1 -pix_fmt yuv420p -an -movflags +faststart \
  public/videos/hero-scrub.mp4
```

Keep the final file under ~15–20MB where possible (trim to the exact
duration you need, no audio track) so it loads quickly on mobile.

## AI video-generation prompts

Since you're generating footage with an AI video tool (Runway, Kling, Sora,
etc.), here are ready-to-use prompts. All are written as **one continuous,
uninterrupted take** — scroll-scrubbing needs a single unbroken shot, not a
cut-together clip, or the reverse-scroll motion will jump.

### 1. Hero scrub video (primary)

> Extreme close-up, cinematic beauty macro shot of a makeup artist's hand
> applying makeup to a bride's face in slow, deliberate motion — starts with
> a bare, glowing complexion, a soft brush sweeps warm bronze eyeshadow
> across the eyelid, then a fine brush lines the eyes, then the hand lifts a
> gold-dusted highlighter brush and sweeps it across the cheekbone catching
> the light. One single continuous unbroken take, no cuts. Shallow depth of
> field, creamy bokeh, warm golden-hour key light from one side, deep
> emerald silk fabric softly out of focus in the background. Skin has a
> natural dewy texture, no harsh retouching look. Shot on a cinema camera,
> 50mm macro lens, shallow f/1.8 depth of field, smooth stabilized motion,
> editorial beauty campaign style, in the visual language of a high-fashion
> Vogue Beauty or Chanel campaign film. 15 seconds, 24fps, 16:9,
> photorealistic, no text, no logos, no on-screen graphics, no jump cuts,
> no shaky handheld motion.

### 2. Hero scrub video — alternate angle (optional B-roll / backup take)

> Extreme close-up cinematic beauty shot, front-on angle at eye level with a
> bride's face, one continuous unbroken take: a hand enters frame holding a
> fine lip brush and slowly, precisely applies a deep rose-gold lipstick in
> one smooth stroke, then a second hand lightly presses a powder puff near
> the cheek releasing a soft shimmer of gold particles caught in backlight.
> Warm rim lighting from behind, soft emerald green bokeh in the
> background, shallow depth of field, no camera cuts, slow continuous
> motion suitable for scroll-scrubbing. Photorealistic, editorial bridal
> campaign aesthetic, 12–15 seconds, 24fps, 16:9, no text or logos.

### 3. Ambient background loop (optional — for Testimonials or section
   transitions, not scroll-scrubbed, just a soft looping backdrop)

> Slow-motion cinematic shot of gold shimmer powder falling through a warm
> beam of light against a deep emerald silk backdrop, soft focus, seamless
> loop, no subject, no hands, no text. Calm, luxurious, ambient. 6 second
> seamless loop, 24fps, 16:9, photorealistic.

**Tips when generating:**
- Ask for **no on-screen text, watermarks, or logos** — you'll want a clean
  plate.
- Request the **highest resolution/bitrate the tool offers** (aim for at
  least 1920×1080, ideally 4K) since the video is displayed full-bleed.
- If the tool caps clip length below what you need (many cap at 5–10s),
  generate two takes from the same prompt and keep the smoother one, or
  stitch two same-lighting takes with a slow cross-dissolve in the middle
  — a hard cut will read as a jarring jump when scrubbed.
- A portrait/vertical 9:16 version is a nice-to-have for a crisper mobile
  crop, but the 16:9 version will still work fine with `object-cover`.

## Customizing the brand

- Colors live in `tailwind.config.ts` (`ink`, `emerald`, `gold`, `ivory`) and
  are mirrored as CSS variables in `app/globals.css` for anything outside
  Tailwind's reach.
- Fonts are loaded in `app/layout.tsx` via `next/font/google`
  (Italiana / Manrope / Cormorant Garamond) — swap the imports there to
  rebrand typography sitewide.
- Copy (studio name "Amara", service list, prices, testimonials) is inline
  in each component — search for the component names above to edit.
- The booking form in `components/Booking.tsx` currently only sets local
  state on submit. Wire `handleSubmit` up to your email/CRM tool of choice
  (Formspree, Resend, a Google Sheet via API route, etc.) before going live.
# Beauty-Parlour-site
