"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("App Error Boundary caught:", error);
    }, [error]);

    const isDatabaseError = error.message?.includes("P1001") || error.message?.includes("database");

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md px-4 text-center antialiased">
            <div className={`mb-8 rounded-full p-8 shadow-2xl ${isDatabaseError ? 'bg-amber-50 animate-bounce' : 'bg-rose-50 animate-pulse'}`}>
                {isDatabaseError ? (
                    <svg className="h-16 w-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                ) : (
                    <svg className="h-16 w-16 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                )}
            </div>

            <div className="max-w-xl space-y-6">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                    {isDatabaseError ? "System Maintenance" : "Application Error"}
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    {isDatabaseError
                        ? "Our travel database is taking a quick break. We're reconnecting the paths for you right now."
                        : "Something went off-route. Don't worry, your progress is saved. Let's get you back on track."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <button
                        onClick={() => {
                            window.location.reload();
                        }}
                        className="w-full sm:w-auto rounded-full bg-slate-900 px-10 py-4 text-sm font-bold text-white shadow-2xl hover:bg-slate-800 transition transform hover:scale-105 active:scale-95"
                    >
                        Reload System
                    </button>
                    <button
                        onClick={() => {
                            window.location.assign("/");
                        }}
                        className="w-full sm:w-auto rounded-full border-2 border-slate-200 bg-white px-10 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition transform hover:scale-105 active:scale-95"
                    >
                        Exit to Home
                    </button>
                </div>

                <div className="pt-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                        Status: {isDatabaseError ? 'DB_TIMEOUT' : 'EXCEPTION'} • Code: {error.digest || '0x404'}
                    </div>
                </div>
            </div>
        </div>
    );
}
