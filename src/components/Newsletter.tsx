"use client";

import { FormEvent, useState } from "react";
import { MailCheck } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter a valid email.");
      return;
    }
    setMessage("You're on the list.");
    setEmail("");
  }

  return (
    <section className="bg-coral-700 py-14 text-white">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            New arrivals, local finds, and embroidery notes.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-coral-50">
            Hear about seasonal Brooklyn goods, custom embroidery ideas, and fresh arrivals from the 5th Avenue shop.
          </p>
        </div>
        <form onSubmit={onSubmit} className="rounded-[8px] bg-white p-2 shadow-2xl sm:flex">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email address"
            className="h-12 min-w-0 flex-1 rounded-[6px] px-4 text-sm font-semibold text-ink-900 outline-none"
          />
          <button
            type="submit"
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-ink-900 px-5 text-sm font-black text-white transition hover:bg-ink-800 sm:mt-0 sm:w-auto"
          >
            <MailCheck size={17} aria-hidden="true" /> Sign up
          </button>
          {message ? <p className="px-4 pb-2 pt-3 text-sm font-semibold text-stone-700 sm:sr-only">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
