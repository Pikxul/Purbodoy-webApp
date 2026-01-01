"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PASSWORD_REGEX =
  /^(?=(?:.*\d){4,})(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|`~+=_-]).{4,}$/;

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPasswordValid = PASSWORD_REGEX.test(password);

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError(
        "Password must have at least 4 characters, 4 digits, and 1 special character."
      );
      return;
    }

    setLoading(true);
    setError(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/login");
    } else {
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <main className="flex justify-center items-start pt-20 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-extrabold text-slate-900">
          Create Account
        </h1>

        <form onSubmit={registerUser} className="space-y-3">
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900
              placeholder:text-slate-800 placeholder:font-medium
              focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900
              placeholder:text-slate-800 placeholder:font-medium
              focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />

          {/* Password */}
          <div className="relative">
            <input
              className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-slate-900
                placeholder:text-slate-800 placeholder:font-medium outline-none
                ${
                  password.length === 0
                    ? "border-slate-200 bg-slate-50"
                    : isPasswordValid
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-red-400 bg-red-50"
                }`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-800"
            >
              {showPassword ? "⌣" : "👁"}
            </button>
          </div>

          {/* Password hint */}
          <p className="text-[11px] text-slate-500">
            Min 4 chars • 4 digits • 1 special character
          </p>

          <button
            className="w-full rounded-full bg-gradient-to-r from-sky-500 to-teal-500 py-2.5 text-sm font-semibold text-white shadow-md
              hover:from-sky-600 hover:to-teal-600 transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
