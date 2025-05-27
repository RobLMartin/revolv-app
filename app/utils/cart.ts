import type { RecordData } from "~/data/records";

export interface CartItem extends RecordData {
  quantity: number;
}

const STORAGE_KEY = "cart-items";

export function getCart(): CartItem[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(record: RecordData) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === record.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...record, quantity: 1 });
  }
  setCart(cart);
  return cart;
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((c) => c.id !== id);
  setCart(cart);
  return cart;
}

export function clearCart() {
  setCart([]);
}
