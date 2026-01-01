// components/Footer.tsx

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-sky-50">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <p className="text-base font-semibold text-slate-900">
            Purbodoy Tours & Travels
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Crafting memorable journeys across India with care,
            transparency, and local expertise.
          </p>
          <p className="text-xs text-slate-500">
            Trusted by families, solo travelers, and explorers.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">
            Explore
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-sky-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-sky-600">
                Packages
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-sky-600">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-sky-600">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">
            Why Purbodoy
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>India-first travel experts</li>
            <li>Handpicked destinations</li>
            <li>Transparent pricing</li>
            <li>Human support, not bots</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">
            Stay inspired
          </p>
          <p className="text-sm text-slate-600">
            Get travel ideas, offers, and updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                text-slate-900 placeholder:text-slate-400 focus:border-sky-500
                focus:ring-1 focus:ring-sky-500 outline-none"
            />
            <button
              disabled
              className="rounded-md bg-slate-200 px-4 text-sm font-semibold
                text-slate-500 cursor-not-allowed"
            >
              Subscribe
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Newsletter coming soon.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2
          sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} Purbodoy Tours & Travels
          </span>
          <span>
            Built with care for journeys that matter
          </span>
        </div>
      </div>
    </footer>
  );
}
