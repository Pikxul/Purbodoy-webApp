"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Error Boundary caught:", error);
    }, [error]);

    const isDatabaseError = error.message?.includes("P1001") || error.message?.includes("database");

    return (
        <html lang="en">
            <body className={`${inter.className} flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 text-center antialiased`}>
                <div className="max-w-md space-y-10">
                    <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full shadow-2xl ${isDatabaseError ? 'bg-amber-100/80 animate-bounce' : 'bg-rose-100/80 animate-pulse'}`}>
                        {isDatabaseError ? (
                            <span className="text-5xl">🔌</span>
                        ) : (
                            <span className="text-5xl">🚨</span>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            {isDatabaseError ? "System Offline" : "Critical Failure"}
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            {isDatabaseError
                                ? "Our core services are temporarily unreachable. We're performing emergency repairs to restore the connection."
                                : "A critical system error occurred. We're resetting the environment to get you back safely."}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
                        <button
                            onClick={() => {
                                window.location.reload();
                            }}
                            className="rounded-full bg-slate-900 px-12 py-4 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition transform hover:scale-105 active:scale-95"
                        >
                            Restart Application
                        </button>
                        <button
                            onClick={() => {
                                window.location.assign("/");
                            }}
                            className="rounded-full border-2 border-slate-200 bg-white px-12 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition transform hover:scale-105 active:scale-95"
                        >
                            Emergency Exit
                        </button>
                    </div>

                    <div className="pt-8 opacity-50">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                            System Node ID: {error.digest || "CORE_FAULT_001"}
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}
