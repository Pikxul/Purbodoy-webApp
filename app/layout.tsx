// app/layout.tsx

import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import Providers from "./providers";

export const metadata = {
  title: "Purbodoy Tours & Travels",
  description:
    "Domestic travel platform across India by Purbodoy Tours & Travels",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900 antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">
              <div className="mx-auto max-w-6xl px-4 py-8">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-sky-50/70 backdrop-blur">
              <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-600 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <span>
                  © {new Date().getFullYear()}{" "}
                  <span className="font-medium text-slate-700">
                    Purbodoy Tours & Travels
                  </span>
                </span>

                <span className="text-slate-500">
                  Crafted with care for journeys that matter
                </span>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
