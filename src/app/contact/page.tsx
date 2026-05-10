import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import StoreMap from "@/components/StoreMap";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Gift Man at 176 5th Ave, Park Slope Brooklyn for gifts, souvenirs, and custom embroidery.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream-50">
      <section className="section-shell py-12">
        <div className="scroll-reveal scroll-soft mb-10 max-w-3xl">
          <h1 className="font-display text-5xl font-semibold text-ink-900 sm:text-7xl">
            Contact Gift Man
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-700">
            Call, email, or stop by the Park Slope shop for product questions, custom embroidery, and local gift ideas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="scroll-reveal reveal-grid space-y-5">
            <div className="rounded-[8px] border border-ink-900/10 bg-white p-5 shadow-soft">
              <h2 className="text-2xl font-black text-ink-900">Store Details</h2>
              <div className="mt-5 space-y-4 text-stone-700">
                <p className="flex gap-3">
                  <MapPin size={20} className="mt-1 shrink-0 text-coral-700" aria-hidden="true" />
                  <span>176 5th Ave, Park Slope Brooklyn, NY 11217</span>
                </p>
                <p className="flex gap-3">
                  <Phone size={20} className="mt-1 shrink-0 text-coral-700" aria-hidden="true" />
                  <a href="tel:+17184990721" className="font-bold hover:text-coral-700">
                    (718) 499-0721
                  </a>
                </p>
                <p className="flex gap-3">
                  <Mail size={20} className="mt-1 shrink-0 text-coral-700" aria-hidden="true" />
                  <a href="mailto:giftmangifts@gmail.com" className="break-all font-bold hover:text-coral-700">
                    giftmangifts@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-[8px] border border-ink-900/10 bg-white p-5 shadow-soft">
              <h2 className="text-2xl font-black text-ink-900">Hours</h2>
              <dl className="mt-5 space-y-3 text-stone-700">
                <div className="flex justify-between gap-4">
                  <dt>Mon-Fri</dt>
                  <dd className="font-black text-ink-900">10-6</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Sat</dt>
                  <dd className="font-black text-ink-900">11-6</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Sun</dt>
                  <dd className="font-black text-ink-900">11-5</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="scroll-reveal scroll-right" data-delay="1">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="scroll-reveal scroll-rise">
          <StoreMap />
        </div>
      </section>
    </div>
  );
}
