//app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    } as any);

    if (result?.ok && !result?.error) {
      setSuccess(true);

      setTimeout(() => {
        router.push(redirectTo);
      }, 700);
    } else {
      setLoading(false);
      setError(result?.error ?? "Invalid credentials");
    }
  }

  function handleGoogle() {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: redirectTo });
  }

  return (
    <main className="flex justify-center items-start pt-20 px-4">
      <div
        className={`w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 transition-all duration-500
          ${success ? "scale-95 opacity-70" : "scale-100 opacity-100"}
        `}
      >
        <h1 className="text-xl font-extrabold text-slate-900">
          Sign in
        </h1>

        <form onSubmit={handleCredentials} className="space-y-3">
          {/* Email */}
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900
              placeholder:text-slate-800 placeholder:font-medium
              focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            autoComplete="email"
          />

          {/* Password */}
          <div className="relative">
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900
                placeholder:text-slate-800 placeholder:font-medium
                focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-800 transition"
            >
              {showPassword ? "⌣" : "👁"}
            </button>
          </div>

          {/* Sign in */}
          <button
            className="w-full rounded-full bg-gradient-to-r from-sky-500 to-teal-500 py-2.5 text-sm font-semibold text-white shadow-md
              hover:from-sky-600 hover:to-teal-600 transition disabled:opacity-70"
            type="submit"
            disabled={loading || success}
          >
            {loading
              ? "Signing in..."
              : success
              ? "Welcome back ✓"
              : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}

        {/* Google Sign In */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={success || googleLoading}
            className="w-full inline-flex items-center justify-center gap-3 rounded-full
              border border-slate-300 bg-white py-2 text-sm font-semibold text-slate-700
              hover:bg-slate-50 transition
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin" />
                <span>
                  Signing in with{" "}
                  <span className="font-bold text-slate-900">Google</span>…
                </span>
              </>
            ) : (
              <>
                {/* Google Logo */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.68 1.23 9.16 3.64l6.85-6.85C35.73 2.58 30.2 0 24 0 14.64 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.73 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.08-.4-4.55H24v9.02h12.94c-.56 3.01-2.23 5.56-4.76 7.27l7.73 5.99c4.51-4.16 7.07-10.29 7.07-17.73z"/>
                  <path fill="#FBBC05" d="M10.54 28.41c-.48-1.45-.76-2.99-.76-4.41s.27-2.96.76-4.41l-7.98-6.19C.92 16.61 0 20.19 0 24s.92 7.39 2.56 10.6l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.2 0 11.73-2.05 15.64-5.57l-7.73-5.99c-2.15 1.45-4.92 2.3-7.91 2.3-6.26 0-11.57-4.23-13.46-9.91l-7.98 6.19C6.51 42.62 14.64 48 24 48z"/>
                </svg>

                <span>
                  Continue with{" "}
                  <span className="font-bold text-slate-900">Google</span>
                </span>
              </>
            )}
          </button>
        </div>

        {/* Register */}
        <p className="text-center text-sm text-slate-600 pt-2">
          No account?{" "}
          <a
            href={`/register${
              redirectTo
                ? `?redirectTo=${encodeURIComponent(redirectTo)}`
                : ""
            }`}
            className="font-semibold text-sky-600 hover:text-sky-700 transition"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
