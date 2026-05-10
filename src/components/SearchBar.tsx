"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchBarProps = {
  compact?: boolean;
};

export default function SearchBar({ compact = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(`/products${params}`);
  }

  return (
    <form onSubmit={onSubmit} role="search" className="relative w-full">
      <Search
        size={compact ? 16 : 18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
        aria-hidden="true"
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search gifts, tees, mugs..."
        aria-label="Search products"
        className="focus-ring h-11 w-full rounded-[8px] border border-ink-900/10 bg-white/85 pl-10 pr-4 text-sm font-semibold text-ink-900 shadow-sm transition placeholder:text-stone-400"
      />
    </form>
  );
}
