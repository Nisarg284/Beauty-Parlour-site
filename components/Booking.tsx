"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import RevealText from "./RevealText";
import GoldStroke from "./GoldStroke";
import MagneticButton from "./MagneticButton";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "date", label: "Event Date", type: "date" },
  { name: "service", label: "Service Interested In", type: "text" },
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire this up to your booking backend / email service (e.g. Formspree, Resend).
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative bg-emerald-deep py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-5 md:gap-10 md:px-10">
        <div className="md:col-span-2">
          <RevealText>
            <span className="font-accent text-lg text-gold-light">Reserve Your Date</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">
              Let&apos;s begin the consultation.
            </h2>
            <GoldStroke width={140} className="my-8" />
            <p className="max-w-sm font-body text-sm text-ivory/60">
              Bridal calendars fill quickly during peak season — reach out as early as
              possible, even before your date is fully confirmed.
            </p>
          </RevealText>

          <RevealText delay={0.15} className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-ivory/70">
              <Phone size={16} className="text-gold" />
              <span className="font-body text-sm">+91 00000 00000</span>
            </div>
            <div className="flex items-center gap-3 text-ivory/70">
              <Mail size={16} className="text-gold" />
              <span className="font-body text-sm">hello@amara.studio</span>
            </div>
            <div className="flex items-center gap-3 text-ivory/70">
              <MapPin size={16} className="text-gold" />
              <span className="font-body text-sm">Vadodara, Gujarat — by appointment</span>
            </div>
          </RevealText>
        </div>

        <RevealText delay={0.1} className="md:col-span-3">
          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-sm border border-gold/25 bg-ink/40 p-10 text-center">
              <GoldStroke width={100} className="mb-6" />
              <p className="font-display text-2xl text-ivory">Thank you.</p>
              <p className="mt-3 max-w-xs font-body text-sm text-ivory/60">
                Your enquiry has been received — we&apos;ll be in touch within one business
                day to confirm your consultation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 rounded-sm border border-gold/20 bg-ink/40 p-8 md:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <div key={field.name} className="group relative">
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      placeholder=" "
                      className="peer w-full border-b border-ivory/25 bg-transparent py-2 font-body text-ivory outline-none transition-colors focus:border-gold"
                    />
                    <label className="pointer-events-none absolute left-0 top-2 font-body text-sm text-ivory/40 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="group relative">
                <textarea
                  name="message"
                  rows={3}
                  placeholder=" "
                  className="peer w-full resize-none border-b border-ivory/25 bg-transparent py-2 font-body text-ivory outline-none transition-colors focus:border-gold"
                />
                <label className="pointer-events-none absolute left-0 top-2 font-body text-sm text-ivory/40 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                  Tell us about the occasion
                </label>
              </div>

              <MagneticButton
                type="submit"
                className="rounded-full border border-gold bg-gold px-8 py-3 font-body text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-transparent hover:text-gold"
              >
                Send Enquiry
              </MagneticButton>
            </form>
          )}
        </RevealText>
      </div>
    </section>
  );
}
