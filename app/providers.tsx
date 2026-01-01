"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { CartProvider } from "@/components/cart-context";
import { BookingProvider } from "@/components/booking-context";

/**
 * 🔑 Internal wrapper so CartProvider can react to session changes
 */
function CartScopedProviders({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  /**
   * 👇 This is the magic line
   * - Authenticated user → scoped cart
   * - Logged out user → fresh cart
   */
  const cartKey =
    status === "authenticated" && session?.user?.email
      ? `cart-${session.user.email}`
      : "cart-guest";

  return (
    <CartProvider key={cartKey}>
      <BookingProvider>{children}</BookingProvider>
    </CartProvider>
  );
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartScopedProviders>{children}</CartScopedProviders>
    </SessionProvider>
  );
}
