"use client";

import Link from "next/link";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatMoney, imageSrcSet } from "@/lib/utils";

const CART_STORAGE_KEY = "giftman-cart-v1";

export type CartItemInput = {
  productId: number;
  productHandle: string;
  variantId: number;
  title: string;
  variantTitle: string;
  image: string;
  price: number;
  options: Record<string, string>;
  sku?: string;
};

export type CartItem = CartItemInput & {
  id: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (item: CartItemInput, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function getItemId(item: Pick<CartItemInput, "productHandle" | "variantId">) {
  return `${item.productHandle}:${item.variantId}`;
}

function parseStoredCart(value: string | null): CartItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem => {
      return (
        typeof item?.id === "string" &&
        typeof item?.productHandle === "string" &&
        typeof item?.title === "string" &&
        typeof item?.image === "string" &&
        typeof item?.price === "number" &&
        typeof item?.quantity === "number"
      );
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)));
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasLoaded, items]);

  const addItem = useCallback((item: CartItemInput, quantity = 1) => {
    const id = getItemId(item);
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
      }
      return [...current, { ...item, id, quantity }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [addItem, clearCart, closeCart, isOpen, itemCount, items, openCart, removeItem, subtotal, updateQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

function CartDrawer() {
  const { closeCart, clearCart, isOpen, itemCount, items, removeItem, subtotal, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-ink-900/45"
        onClick={closeCart}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-ink-900/10 bg-cream-50 shadow-lift"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <div>
            <h2 id="cart-title" className="font-display text-3xl font-semibold text-ink-900">
              Your Cart
            </h2>
            <p className="mt-1 text-sm font-semibold text-stone-600">
              {itemCount === 1 ? "1 item" : `${itemCount} items`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="focus-ring flex size-10 items-center justify-center rounded-[8px] border border-ink-900/10 bg-white text-ink-900 shadow-sm transition hover:border-coral-300"
            aria-label="Close cart"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {items.length ? (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <div key={item.id} className="rounded-[8px] border border-ink-900/10 bg-white p-3 shadow-sm">
                  <div className="grid grid-cols-[82px_1fr] gap-3">
                    <Link
                      href={`/products/${item.productHandle}`}
                      onClick={closeCart}
                      className="relative aspect-square overflow-hidden rounded-[8px] bg-cream-100"
                    >
                      <img
                        src={item.image}
                        srcSet={imageSrcSet(item.image)}
                        sizes="82px"
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-contain p-2"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/products/${item.productHandle}`}
                            onClick={closeCart}
                            className="line-clamp-2 text-sm font-black leading-snug text-ink-900 hover:text-coral-700"
                          >
                            {item.title}
                          </Link>
                          {item.variantTitle && item.variantTitle !== "Default Title" ? (
                            <p className="mt-1 text-xs font-semibold text-stone-500">{item.variantTitle}</p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="focus-ring flex size-8 shrink-0 items-center justify-center rounded-[6px] border border-ink-900/10 text-stone-500 transition hover:border-coral-300 hover:text-coral-700"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex h-9 items-center overflow-hidden rounded-[8px] border border-ink-900/10 bg-cream-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="focus-ring flex h-9 w-9 items-center justify-center text-ink-900 transition hover:bg-white"
                            aria-label={`Decrease ${item.title} quantity`}
                          >
                            <Minus size={15} aria-hidden="true" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-black text-ink-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="focus-ring flex h-9 w-9 items-center justify-center text-ink-900 transition hover:bg-white"
                            aria-label={`Increase ${item.title} quantity`}
                          >
                            <Plus size={15} aria-hidden="true" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-coral-700">
                          {formatMoney(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink-900/10 bg-white px-5 py-5 shadow-soft">
              <div className="flex items-center justify-between text-base font-black text-ink-900">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">
                Shipping, embroidery details, and taxes would be handled during checkout.
              </p>

              <div className="mt-5 grid gap-2">
                <button
                  type="button"
                  disabled
                  className="h-12 rounded-[8px] bg-ink-900 text-sm font-black uppercase text-white opacity-80"
                >
                  Checkout placeholder
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled
                    className="h-11 rounded-[8px] border border-ink-900/10 bg-cream-50 text-sm font-black text-ink-900 opacity-70"
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    disabled
                    className="h-11 rounded-[8px] border border-ink-900/10 bg-cream-50 text-sm font-black text-ink-900 opacity-70"
                  >
                    Shop Pay
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" onClick={clearCart} className="text-sm font-black text-stone-500 hover:text-coral-700">
                  Clear cart
                </button>
                <button type="button" onClick={closeCart} className="text-sm font-black text-coral-700">
                  Keep shopping
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-[8px] bg-coral-100 text-coral-700">
              <ShoppingBag size={26} aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold text-ink-900">Your cart is empty</h3>
            <p className="mt-3 max-w-sm text-sm font-semibold leading-6 text-stone-600">
              Add Brooklyn gifts, souvenirs, apparel, or embroidery-ready pieces to start an order.
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className="focus-ring mt-6 inline-flex h-12 items-center justify-center rounded-[8px] bg-coral-700 px-5 text-sm font-black text-white shadow-sm transition hover:bg-coral-800"
            >
              Shop products
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
