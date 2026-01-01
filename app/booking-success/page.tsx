//app/booking-success/page.tsx

"use client";

import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-white p-8 shadow-sm text-center space-y-6">
        {/* Success badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-500 text-white text-2xl font-bold shadow-sm">
          ✓
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-900">
          Booking Request Received 🎉
        </h1>

        {/* Description */}
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your booking request has been recorded successfully.
          In the final version, you’ll receive a booking ID along with
          WhatsApp and email confirmations.
        </p>

        {/* Info note */}
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
          You can track all your trips and updates from your profile.
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/packages"
            className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:from-sky-600 hover:to-teal-600 transition"
          >
            Explore More Trips
          </Link>

          <Link
            href="/profile"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Go to Profile
          </Link>
        </div>

        {/* Footer */}
        <p className="pt-2 text-[11px] text-slate-400">
          Thank you for choosing Purbodoy Tours & Travels 💙
        </p>
      </div>
    </main>
  );
}
