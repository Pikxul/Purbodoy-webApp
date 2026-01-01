// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-12">
      {/* Hero Section */}
      <section className="mt-6 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Purbodoy Tours & Travels
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Explore Incredible India with{" "}
            <span className="text-sky-700">Purbodoy</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base">
            Curated domestic trips across India — from beaches and mountains to
            heritage and culture. Book family, friends, or solo getaways with a
            smooth online experience.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/packages"
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition"
            >
              Browse Packages
            </Link>

            <Link
              href="/gallery"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              View Gallery
            </Link>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            India-only domestic trips • Handled by Purbodoy Tours & Travels
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative h-56 md:h-72 rounded-2xl border overflow-hidden flex items-center justify-center
          bg-gradient-to-br from-sky-100 via-white to-emerald-100">
          
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#0ea5e9_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#22c55e_0,_transparent_55%)]" />

          <div className="relative z-10 text-center space-y-2 px-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Featured Journeys
            </p>
            <p className="text-sm md:text-base text-slate-800">
              Northeast • Himachal • Goa • Rajasthan • Kerala
            </p>
            <p className="text-xs text-slate-500">
              We'll later plug in real trip cards & carousel here.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Why travel with Purbodoy?
        </h2>

        <p className="text-sm text-slate-600 max-w-2xl">
          This section will later be powered from CMS / admin, but for now
          we’ll keep simple highlight cards to impress the client and structure
          the page.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 shadow-sm hover:border-sky-200 transition">
            <h3 className="text-sm font-semibold text-slate-900">
              India-Only Experts
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Focused purely on domestic trips across India — deep knowledge of
              routes, seasons, and local spots.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm hover:border-emerald-200 transition">
            <h3 className="text-sm font-semibold text-slate-900">
              Curated Packages
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Tailored itineraries for families, couples, groups, and solo
              travelers with transparent pricing.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm hover:border-amber-200 transition">
            <h3 className="text-sm font-semibold text-slate-900">
              Assisted Booking Experience
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              WhatsApp updates, call support, and simple checkout experience
              that we’ll gradually wire in.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="space-y-4 pb-10">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Popular Destinations (sample)
          </h2>

          <Link
            href="/packages"
            className="text-xs font-semibold text-sky-700 hover:text-sky-800"
          >
            View all packages →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "Goa Beach Escape",
              location: "Goa, India",
              tag: "Beach • Friends • Couples",
            },
            {
              title: "Himalayan Retreat",
              location: "Himachal Pradesh",
              tag: "Mountains • Family • Nature",
            },
            {
              title: "Royal Rajasthan Circuit",
              location: "Jaipur, Jodhpur, Udaipur",
              tag: "Heritage • Culture • Forts",
            },
          ].map((pkg) => (
            <div
              key={pkg.title}
              className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md hover:border-amber-200 transition"
            >
              <p className="text-xs font-semibold uppercase text-amber-600 mb-1">
                Sample Package
              </p>
              <h3 className="text-sm font-semibold text-slate-900">
                {pkg.title}
              </h3>
              <p className="text-xs text-slate-500">{pkg.location}</p>
              <p className="mt-2 text-xs text-slate-600">{pkg.tag}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-400">
          These are placeholder cards. Later we’ll pull real packages from the
          database and show dynamic pricing & tags here.
        </p>
      </section>
    </main>
  );
}
