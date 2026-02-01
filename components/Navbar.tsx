//components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  const isLoggedIn = status === "authenticated";

  return (
    <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-500 text-white font-bold shadow-sm">
            P
          </span>
          <span className="font-semibold text-slate-900 tracking-tight">
            Purbodoy Tours & Travels
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {isLoggedIn && (
            <>
              <Link
                href="/wishlist"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  pathname.startsWith("/wishlist")
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                My Wish List
              </Link>

              <Link
                href="/cart"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  pathname.startsWith("/cart")
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                Cart
              </Link>

              <Link
                href="/profile"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  pathname.startsWith("/profile")
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                Profile
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && status !== "loading" && (
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:from-sky-600 hover:to-teal-600 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-100 bg-white text-slate-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-sky-100 bg-white/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white"
                      : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {isLoggedIn && (
              <>
                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                >
                  Wishlist
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                >
                  Cart
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="mt-1 rounded-md px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && status !== "loading" && (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}