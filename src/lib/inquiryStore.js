import { useEffect, useState } from "react";

const KEY = "sa_inquiry_cart_v1";
const listeners = new Set();
let loaded = false;
let items = [];

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    items = raw ? JSON.parse(raw) : [];
  } catch {
    items = [];
  }
}

function ensureLoaded() {
  if (!loaded) {
    load();
    loaded = true;
  }
}

function emit() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  }
  listeners.forEach((listener) => listener());
}

function emitAdded() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("sa:quote-added"));
  }
}

export const inquiryStore = {
  subscribe(listener) {
    ensureLoaded();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    ensureLoaded();
    return items;
  },
  add(item) {
    ensureLoaded();
    const existing = items.find((cartItem) => cartItem.productId === item.productId);

    if (existing) {
      items = items.map((cartItem) =>
        cartItem.productId === item.productId
          ? {
              ...cartItem,
              ...item,
              note: cartItem.note,
              quantity: cartItem.quantity + (item.quantity ?? 1),
            }
          : cartItem,
      );
    } else {
      items = [...items, { ...item, quantity: item.quantity ?? 1 }];
    }

    emit();
    emitAdded();
  },
  remove(productId) {
    ensureLoaded();
    items = items.filter((item) => item.productId !== productId);
    emit();
  },
  setQuantity(productId, quantity) {
    ensureLoaded();
    const safeQuantity = Math.max(1, Number.parseInt(quantity || "1", 10));
    items = items.map((item) =>
      item.productId === productId ? { ...item, quantity: safeQuantity } : item,
    );
    emit();
  },
  setNote(productId, note) {
    ensureLoaded();
    items = items.map((item) => (item.productId === productId ? { ...item, note } : item));
    emit();
  },
  clear() {
    ensureLoaded();
    items = [];
    emit();
  },
};

export function useInquiryCart() {
  const [snapshot, setSnapshot] = useState(() => [...inquiryStore.getSnapshot()]);

  useEffect(
    () =>
      inquiryStore.subscribe(() => {
        setSnapshot([...inquiryStore.getSnapshot()]);
      }),
    [],
  );

  return snapshot;
}
