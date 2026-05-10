# Fix Divider Spacing in HeroSection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the divider line spacing issue in the HeroSection component where text appears too close to the right-side divider lines by adding balanced left padding.

**Architecture:** Modify the existing HeroSection.tsx component to add left padding (pl-4) to the feature icon divs that currently only have right padding (pr-4), creating balanced spacing on both sides of the text.

**Tech Stack:** Next.js 14.2.35, React 18.3.1, TypeScript, Lucide React icons

---

### Task 1: Implement balanced padding fix in HeroSection component

**Files:**
- Modify: `/Users/henryzhao/Desktop/Volta/gift-man/src/components/HeroSection.tsx:40-50`

- [ ] **Step 1: Identify the exact lines to modify**

Looking at lines 40-50 in HeroSection.tsx where the feature icons are rendered:
```jsx
<div className="scroll-reveal reveal-grid mt-10 grid max-w-2xl grid-cols-2 border-y border-ink-900/12 sm:grid-cols-4" data-delay="2">
  {[
    { icon: Store, label: "Est. 1982" },
    { icon: ShieldCheck, label: "Family owned" },
    { icon: Truck, label: "Free shipping $150+" },
    { icon: Scissors, label: "Embroidery on-site" },
  ].map((item) => (
    <div key={item.label} className="border-ink-900/12 py-4 pr-4 sm:border-r sm:last:border-r-0">
      <item.icon size={20} className="mb-3 text-coral-700" aria-hidden="true" />
      <p className="text-sm font-black leading-tight text-ink-900">{item.label}</p>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Add left padding (pl-4) to balance the existing right padding (pr-4)**

Change the className from `"border-ink-900/12 py-4 pr-4 sm:border-r sm:last:border-r-0"` to `"border-ink-900/12 py-4 px-4 sm:border-r sm:last:border-r-0"`

This adds pl-4 (left padding) to match the existing pr-4 (right padding), creating balanced spacing.

- [ ] **Step 3: Verify the change works correctly**

The modified line should look like:
```jsx
<div key={item.label} className="border-ink-900/12 py-4 px-4 sm:border-r sm:last:border-r-0">
```

- [ ] **Step 4: Commit the changes**

```bash
git add src/components/HeroSection.tsx
git commit -m "fix: add balanced padding to HeroSection feature icons for better divider spacing"
```