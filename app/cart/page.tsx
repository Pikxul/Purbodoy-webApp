// app/cart/page.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, subtotal, updateMembers, removeItem } = useCart();
  const { status } = useSession();
  const router = useRouter();

  // 🔒 AUTH GUARD
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirectTo=/cart");
    }
  }, [status, router]);

  if (status === "loading") return null;

  // 🌊 EMPTY CART STATE
  if (items.length === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center space-y-5 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="text-sm text-slate-600 max-w-sm">
          Looks like you haven’t picked a trip yet. Let’s get you exploring ✨
        </p>
        <Link
          href="/packages"
          className="rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-7 py-2.5 text-sm font-semibold text-white shadow-md hover:from-sky-600 hover:to-emerald-600 transition"
        >
          Explore Packages
        </Link>
      </main>
    );
  }

  return (
    <main className="space-y-10 pb-12">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Your Travel Cart
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Review your selected trips. Adjust travellers or remove items before
          checkout.
        </p>
      </section>

      {/* Layout */}
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
        {/* LEFT – Items */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b px-5 py-3 flex justify-between items-center bg-gradient-to-r from-sky-50 via-white to-emerald-50">
              <h2 className="text-sm font-semibold text-slate-900">
                Selected Trips
              </h2>
              <span className="text-[11px] text-slate-500">
                {items.length} item(s)
              </span>
            </div>

            <div className="divide-y">
              {items.map((item) => {
                const total = item.members * item.pricePerHead;

                return (
                  <div
                    key={item.packageId}
                    className="px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between hover:bg-emerald-50/40 transition"
                  >
                    {/* Trip Info */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {item.location}
                      </p>

                      {/* Members */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-slate-500">
                          Members
                        </span>
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] gap-2 shadow-sm">
                          <button
                            className="px-1 text-slate-600 hover:text-emerald-600 transition"
                            onClick={() =>
                              updateMembers(
                                item.packageId,
                                item.members - 1
                              )
                            }
                          >
                            −
                          </button>
                          <span className="font-medium px-1 text-slate-600">
                            {item.members}
                          </span>
                          <button
                            className="px-1 text-slate-600 hover:text-emerald-600 transition"
                            onClick={() =>
                              updateMembers(
                                item.packageId,
                                item.members + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-[11px] text-slate-500">
                        Trip Total
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{total.toLocaleString("en-IN")}
                      </p>
                      <button
                        onClick={() => removeItem(item.packageId)}
                        className="text-[11px] text-rose-500 hover:text-rose-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT – Summary */}
        <aside className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-sky-50 p-5 shadow-sm space-y-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Price Summary
          </h2>

          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="border-t pt-3 flex justify-between text-base font-semibold">
            <span className="text-slate-900">Total</span>
            <span className="text-amber-600">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <Link
            href="/checkout"
            className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-amber-600 hover:to-rose-600 transition"
          >
            Proceed to Checkout
          </Link>

          <p className="text-[11px] text-slate-500 text-center">
            Secure checkout • No hidden charges
          </p>
        </aside>
      </section>
    </main>
  );
}
