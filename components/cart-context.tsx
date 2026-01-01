"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

/**
 * 🧺 Cart item (DB-aligned)
 */
type CartItem = {
  packageId: string;
  title: string;
  location: string;
  pricePerHead: number;
  members: number;
};

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  totalMembers: number;
  addItem: (
    item: Omit<CartItem, "members"> & { members?: number }
  ) => void;
  removeItem: (packageId: string) => void;
  updateMembers: (packageId: string, members: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const [items, setItems] = useState<CartItem[]>([]);
  const [storageKey, setStorageKey] = useState<string | null>(null);

  useEffect(() => {                                           // 🔐 Resolve storage key based on auth state
    if (status === "authenticated" && session?.user?.email) {
      setStorageKey(`purbodoy_cart_${session.user.email}`);
    } else {
      setStorageKey(null);
      setItems([]);                                           // 🧹 hard reset on logout
    }
  }, [status, session?.user?.email]);

  useEffect(() => {                                           // 🔁 Load cart for the CURRENT user
    if (!storageKey) return;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      setItems([]);
    }
  }, [storageKey]);

  /**
   * 💾 Persist cart per-user
   */
  useEffect(() => {
    if (!storageKey) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // silent
    }
  }, [items, storageKey]);

  // ➕ Add item
  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const existing = prev.find(
        (p) => p.packageId === item.packageId
      );

      const membersToAdd = item.members ?? 1;

      if (existing) {
        return prev.map((p) =>
          p.packageId === item.packageId
            ? { ...p, members: p.members + membersToAdd }
            : p
        );
      }

      return [
        ...prev,
        {
          packageId: item.packageId,
          title: item.title,
          location: item.location,
          pricePerHead: item.pricePerHead,
          members: membersToAdd,
        },
      ];
    });
  };

  const removeItem = (packageId: string) => {
    setItems((prev) =>
      prev.filter((p) => p.packageId !== packageId)
    );
  };

  const updateMembers = (packageId: string, members: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.packageId === packageId
          ? { ...p, members: Math.max(1, Math.floor(members)) }
          : p
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {}
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.members * item.pricePerHead,
    0
  );

  const totalMembers = items.reduce(
    (sum, item) => sum + item.members,
    0
  );

  const value: CartContextValue = {
    items,
    subtotal,
    totalMembers,
    addItem,
    removeItem,
    updateMembers,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
