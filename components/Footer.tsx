import { Instagram, Facebook, Mail } from "lucide-react";
import GoldStroke from "./GoldStroke";

export default function Footer() {
  return (
    <footer className="relative bg-ink pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#top" className="font-display text-3xl tracking-widest text-ivory">
            AMARA
          </a>
          <GoldStroke width={140} />
          <nav className="flex flex-wrap justify-center gap-8 font-body text-xs uppercase tracking-widest2 text-ivory/60">
            <a href="#story" className="transition-colors hover:text-gold-light">Story</a>
            <a href="#services" className="transition-colors hover:text-gold-light">Services</a>
            <a href="#portfolio" className="transition-colors hover:text-gold-light">Portfolio</a>
            <a href="#testimonials" className="transition-colors hover:text-gold-light">Testimonials</a>
            <a href="#booking" className="transition-colors hover:text-gold-light">Book</a>
          </nav>
          <div className="flex gap-6 text-ivory/60">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-gold-light">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-gold-light">
              <Facebook size={18} />
            </a>
            <a href="mailto:hello@amara.studio" aria-label="Email" className="transition-colors hover:text-gold-light">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-center font-body text-[11px] text-ivory/35 md:flex-row">
          <span>© {new Date().getFullYear()} Amara Beauty Atelier. All rights reserved.</span>
          <span>Vadodara, Gujarat</span>
        </div>
      </div>
    </footer>
  );
}
