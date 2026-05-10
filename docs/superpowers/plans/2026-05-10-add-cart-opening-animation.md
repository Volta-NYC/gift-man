# Add Opening Animation to Cart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add symmetric opening animation to the cart drawer so that both opening and closing animations have the same duration and feel, addressing the user's concern that opening animation feels missing.

**Architecture:** Modify the CartDrawer component's useEffect hook to add a delay when setting shouldRender to true on cart open (matching the existing delay when setting shouldRender to false on cart close), creating symmetric opening and closing animations.

**Tech Stack:** Next.js 14.2.35, React 18.3.1, TypeScript

---

### Task 1: Add opening animation delay to CartDrawer

**Files:**
- Modify: `/Users/henryzhao/Desktop/Volta/gift-man/src/components/CartProvider.tsx:163-180`

- [ ] **Step 1: Identify the current useEffect logic**

Looking at lines 167-178 in CartProvider.tsx:
```javascript
useEffect(() => {
  if (isOpen) {
    setShouldRender(true);
    return undefined;
  }

  const timeout = window.setTimeout(() => {
    setShouldRender(false);
  }, CART_ANIMATION_MS);

  return () => window.clearTimeout(timeout);
}, [isOpen]);
```

Currently, when isOpen becomes true, shouldRender is set to true immediately. When isOpen becomes false, there's a CART_ANIMATION_MS delay before setting shouldRender to false.

- [ ] **Step 2: Modify the useEffect to add symmetric delay for opening**

Change the useEffect to:
```javascript
useEffect(() => {
  const timeout = window.setTimeout(() => {
    setShouldRender(isOpen);
  }, CART_ANIMATION_MS);

  return () => window.clearTimeout(timeout);
}, [isOpen]);
```

This will delay both opening and closing by CART_ANIMATION_MS, allowing the CSS transitions to complete.

- [ ] **Step 3: Verify the change works correctly**

The modified useEffect should now delay both opening and closing animations equally.

- [ ] **Step 4: Commit the changes**

```bash
git add src/components/CartProvider.tsx
git commit -m "fix: add symmetric opening animation to cart drawer to match closing animation"
```