"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email.");
      return;
    }
    if (message.trim().length < 10) {
      setStatus("Please add a little more detail.");
      return;
    }

    event.currentTarget.reset();
    setStatus("Message ready. Call or email the shop for the fastest response.");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[8px] border border-ink-900/10 bg-white p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="focus-ring h-12 w-full rounded-[8px] border border-ink-900/10 bg-cream-50 px-3 text-sm font-semibold"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="focus-ring h-12 w-full rounded-[8px] border border-ink-900/10 bg-cream-50 px-3 text-sm font-semibold"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-2 block text-sm font-bold text-ink-900" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          className="focus-ring w-full rounded-[8px] border border-ink-900/10 bg-cream-50 px-3 py-3 text-sm font-semibold"
        />
      </div>
      <button
        type="submit"
        className="focus-ring mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-coral-700 px-6 text-sm font-black uppercase text-white shadow-sm transition hover:bg-coral-800"
      >
        <Send size={17} aria-hidden="true" /> Send Message
      </button>
      {status ? <p className="mt-4 text-sm font-semibold text-stone-700">{status}</p> : null}
    </form>
  );
}
