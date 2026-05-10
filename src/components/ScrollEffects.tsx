"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      root.classList.remove("scroll-effects-ready");
      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    root.classList.add("scroll-effects-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.08,
      },
    );

    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>(".scroll-reveal:not(.is-visible)").forEach((element) => {
        observer.observe(element);
      });
    };

    observeReveals();

    const mutationObserver = new MutationObserver(observeReveals);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
