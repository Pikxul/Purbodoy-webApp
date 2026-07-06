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
    <header className="sticky top-0 z-[100] border-b border-sky-100/50 bg-white/70 backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 animate-subtle-pulse rounded-full bg-gradient-to-br from-sky-400 to-teal-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
            <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-500 text-lg font-black text-white shadow-lg ring-2 ring-white/20">
              P
            </span>
          </div>
          <span className="text-lg font-black tracking-tighter text-slate-900">
            PURBODOY
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${active
                  ? "text-white"
                  : "text-slate-600 hover:text-sky-600 hover:bg-sky-50/50"
                  }`}
              >
                {active && (
                  <div className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 shadow-md animate-in fade-in zoom-in-95 duration-300" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          <div className="mx-2 h-4 w-px bg-slate-200" />

          {isLoggedIn && (
            <>
              <Link
                href="/wishlist"
                className={`relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${pathname.startsWith("/wishlist")
                  ? "text-white"
                  : "text-slate-600 hover:text-sky-600 hover:bg-sky-50/50"
                  }`}
              >
                {pathname.startsWith("/wishlist") && (
                  <div className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 shadow-md" />
                )}
                <span className="relative z-10">Wishlist</span>
              </Link>

              <Link
                href="/cart"
                className={`relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${pathname.startsWith("/cart")
                  ? "text-white"
                  : "text-slate-600 hover:text-sky-600 hover:bg-sky-50/50"
                  }`}
              >
                {pathname.startsWith("/cart") && (
                  <div className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 shadow-md" />
                )}
                <span className="relative z-10">Cart</span>
              </Link>

              <Link
                href="/profile"
                className={`relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${pathname.startsWith("/profile")
                  ? "text-white"
                  : "text-slate-600 hover:text-sky-600 hover:bg-sky-50/50"
                  }`}
              >
                {pathname.startsWith("/profile") && (
                  <div className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 shadow-md" />
                )}
                <span className="relative z-10">Profile</span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-2 h-9 w-9 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm shadow-rose-200/50"
                title="Logout"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </>
          )}

          {status === "loading" && (
            <div className="flex gap-2">
              <div className="h-9 w-20 animate-pulse rounded-full bg-slate-100" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />
            </div>
          )}

          {!isLoggedIn && status !== "loading" && (
            <Link
              href="/login"
              className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:bg-slate-800 transition transform hover:scale-105 active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-700 md:hidden transition-all duration-300 active:scale-90"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <div className="relative h-4 w-5">
            <span className={`absolute h-0.5 w-full bg-slate-900 transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute h-0.5 w-full bg-slate-900 top-2 transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
            <span className={`absolute h-0.5 w-full bg-slate-900 transition-all duration-300 ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white/95 backdrop-blur-2xl md:hidden animate-in slide-in-from-top duration-300">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 p-4">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 ${active
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {isLoggedIn && (
              <>
                <div className="my-2 h-px bg-slate-100" />
                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  My Wishlist
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Shopping Cart
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="mt-2 rounded-2xl bg-rose-50 px-4 py-3 text-left text-sm font-bold text-rose-600"
                >
                  Sign Out
                </button>
              </>
            )}

            {!isLoggedIn && status !== "loading" && (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="mt-4 rounded-full bg-slate-900 px-6 py-4 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl"
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
