// app/layout.tsx

import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

            {/* Shared Footer */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
