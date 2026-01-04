// app/checkout/page.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type BillingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  pin: string;
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { status } = useSession();

  // 🔒 AUTH GUARD
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirectTo=/checkout");
    }
  }, [status, router]);

  if (status === "loading") return null;

  // 🧾 Billing state
  const [billing, setBilling] = useState<BillingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "India",
    state: "",
    pin: "",
  });

  // 💳 Payment state
  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "debit" | "upi" | ""
  >("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pinError, setPinError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (field: keyof BillingForm, value: string) => {
    setBilling((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    if (field === 'phone') {
      if (!/^\d{10}$/.test(value)) {
        setPhoneError("Phone number must be exactly 10 digits.");
      } else {
        setPhoneError("");
      }
    }

    if (field === 'pin') {
      if (!/^\d{6}$/.test(value)) {
        setPinError("ZIP code must be exactly 6 digits.");
      } else {
        setPinError("");
      }
    }
  };

  const isBillingValid = Object.values(billing).every(
    (v) => v.trim() !== ""
  ) && !emailError && !phoneError && !pinError;

  const canConfirm =
    isBillingValid && paymentMethod !== "" && !isSubmitting;

  // 🚀 CREATE BOOKING (DB)
  const handleConfirmBooking = async () => {
    if (!canConfirm) return;

    try {
      setIsSubmitting(true);
      setError("");

      const bookingItems = items.map((item) => ({
        packageId: item.packageId,
        location: item.location,
        membersCount: item.members,
        pricePerHead: item.pricePerHead,
      }));

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: bookingItems,
          totalAmount: subtotal,
          billing,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      clearCart();
      router.push("/booking-success");
    } catch (err) {
      console.error("CHECKOUT_ERROR", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🛑 EMPTY CART
  if (items.length === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center space-y-5 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Nothing to checkout
        </h1>
        <p className="text-sm text-slate-600">
          Your cart is empty.
        </p>
        <Link
          href="/packages"
          className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-7 py-2.5 text-sm font-semibold text-white shadow-md hover:from-sky-600 hover:to-teal-600 transition"
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
          Secure Checkout
        </h1>
        <p className="text-sm text-slate-600">
          Complete billing details and choose a payment method.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1.1fr] items-start">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Billing */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Billing Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 text-slate-700">
              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["email", "Email"],
                ["phone", "Phone"],
              ].map(([k, l]) => (
                <input
                  key={k}
                  placeholder={l}
                  value={billing[k as keyof BillingForm]}
                  onChange={(e) =>
                    handleChange(
                      k as keyof BillingForm,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm
                  placeholder:text-slate-600 placeholder:font-medium
                  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                />
              ))}
            </div>

            {emailError && (
              <p className="text-xs text-red-500">{emailError}</p>
            )}

            {phoneError && (
              <p className="text-xs text-red-500">{phoneError}</p>
            )}

            <input
              placeholder="Address"
              value={billing.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600
              placeholder:text-slate-600 placeholder:font-medium
              focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            />

            <div className="grid gap-4 sm:grid-cols-3 text-slate-700">
              {[
                ["country", "Country"],
                ["state", "State"],
                ["pin", "ZIP / PIN"],
              ].map(([k, l]) => (
                <input
                  key={k}
                  placeholder={l}
                  value={billing[k as keyof BillingForm]}
                  onChange={(e) =>
                    handleChange(
                      k as keyof BillingForm,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm
                  placeholder:text-slate-600 placeholder:font-medium
                  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                />
              ))}
            </div>

            {pinError && (
              <p className="text-xs text-red-500">{pinError}</p>
            )}

            {!isBillingValid && (
              <p className="text-xs text-red-500">
                All billing fields are required.
              </p>
            )}
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Payment Method
            </h2>

            {["credit", "debit", "upi"].map((m) => (
              <label
                key={m}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition cursor-pointer
                  ${
                    paymentMethod === m
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === m}
                  onChange={() => setPaymentMethod(m as any)}
                />
                <span className="font-medium text-slate-700">
                  {m.toUpperCase()}
                </span>
              </label>
            ))}

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              onClick={handleConfirmBooking}
              disabled={!canConfirm}
              className={`w-full rounded-full px-5 py-2.5 text-sm font-semibold transition
                ${
                  canConfirm
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md hover:from-sky-600 hover:to-teal-600"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Trip Summary
          </h2>

          {items.map((item) => (
            <div
              key={item.packageId}
              className="flex justify-between text-xs text-slate-700"
            >
              <span>{item.title}</span>
              <span>
                ₹{(item.members * item.pricePerHead).toLocaleString("en-IN")}
              </span>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-amber-600">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
        </aside>
      </section>
    </main>
  );
}
