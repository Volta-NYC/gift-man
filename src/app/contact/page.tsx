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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-7xl">
            Contact Gift Man
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Call, email, or stop by the Park Slope shop for product questions, custom embroidery, and local gift ideas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black text-stone-950">Store Details</h2>
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

            <div className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black text-stone-950">Hours</h2>
              <dl className="mt-5 space-y-3 text-stone-700">
                <div className="flex justify-between gap-4">
                  <dt>Mon-Fri</dt>
                  <dd className="font-black text-stone-950">10-6</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Sat</dt>
                  <dd className="font-black text-stone-950">11-6</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Sun</dt>
                  <dd className="font-black text-stone-950">11-5</dd>
                </div>
              </dl>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <StoreMap />
      </section>
    </div>
  );
}
