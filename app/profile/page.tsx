"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* =======================
   Types
======================= */
type Package = {
  id: string;
  title: string;
  location: string;
};

type BookingItem = {
  id: string;
  membersCount: number;
  pricePerHead: number;
  package: Package;
};

type Booking = {
  id: string;
  totalAmount: number;
  status: "PENDING_PAYMENT" | "CONFIRMED";
  createdAt: string;
  items: BookingItem[];
};

type ProfileForm = {
  name: string;
  phone: string;
  address: string;
  dateOfBirth: string;
};

/* =======================
   Skeleton Loader
======================= */
function ProfileSkeleton() {
  return (
    <main className="space-y-16 pb-16 animate-pulse">
      {/* Profile card skeleton */}
      <section className="relative rounded-2xl bg-white shadow-sm">
        <div className="absolute top-4 right-4 h-9 w-28 rounded bg-slate-200" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-56 rounded bg-slate-100" />
              <div className="h-3 w-32 rounded bg-slate-100" />
            </div>
          </div>
        </div>

        <div className="p-6 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 rounded bg-slate-100" />
              <div className="h-9 w-full rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>

      {/* Trips skeleton */}
      <section className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
        <div className="h-4 w-24 rounded bg-slate-200" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-slate-50 p-4 space-y-2"
          >
            <div className="flex justify-between">
              <div className="h-3 w-48 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
            <div className="h-3 w-64 rounded bg-slate-100" />
            <div className="h-3 w-32 rounded bg-slate-100" />
          </div>
        ))}
      </section>
    </main>
  );
}

/* =======================
   Page
======================= */
export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileForm>({
    name: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  const [draftProfile, setDraftProfile] =
    useState<ProfileForm>(profile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // 🔒 AUTH GUARD
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirectTo=/profile");
    }
  }, [status, router]);

  // 📡 FETCH DATA
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        const [bookingsRes, profileRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/profile"),
        ]);

        if (bookingsRes.ok) {
          setBookings(await bookingsRes.json());
        }

        if (profileRes.ok) {
          const user = await profileRes.json();
          const normalized: ProfileForm = {
            name: user.name ?? "",
            phone: user.phone ?? "",
            address: user.address ?? "",
            dateOfBirth: user.dateOfBirth
              ? user.dateOfBirth.slice(0, 10)
              : "",
          };
          setProfile(normalized);
          setDraftProfile(normalized);
        }
      } catch (err) {
        console.error("PROFILE_FETCH_ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftProfile),
      });

      if (!res.ok) throw new Error();

      setProfile(draftProfile);
      setEditing(false);
      setSaved(true);
    } catch {
      console.error("PROFILE_SAVE_ERROR");
    } finally {
      setSaving(false);
    }
  };

  /* ✅ THIS IS THE FIX */
  if (status === "loading" || loading) {
    return <ProfileSkeleton />;
  }

  return (
    <main className="space-y-16 pb-16">
      {/* PROFILE CARD */}
      <section className="relative rounded-2xl bg-white shadow-sm">
        {!editing ? (
          <button
            onClick={() => {
              setDraftProfile(profile);
              setEditing(true);
            }}
            className="absolute top-4 right-4 rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50 text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSaveProfile}
            disabled={saving || !!phoneError}
            className="absolute top-4 right-4 rounded-md bg-sky-600 text-white px-4 py-2 text-sm font-medium hover:bg-sky-700 disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        )}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center p-6">
          <div className="flex items-center gap-4">
            <svg className="h-16 w-16 rounded-full bg-slate-200 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {profile.name || "Purbodoy Traveller"}
              </p>
              <p className="text-sm text-slate-500">
                {session?.user?.email}
              </p>
              <p className="text-sm text-slate-500">
                {profile.phone || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 grid gap-6 sm:grid-cols-2 text-slate-600 transition-all duration-300 ease-in-out ${
          editing ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          {[
            ["Full Name", "name"],
            ["Phone Number", "phone"],
            ["Address", "address"],
            ["Date of Birth", "dateOfBirth"],
          ].map(([label, key]) => (
            <div key={key} className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">
                {label}
              </p>

              {editing ? (
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  value={draftProfile[key as keyof ProfileForm]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDraftProfile((p) => ({
                      ...p,
                      [key]: value,
                    }));
                    if (key === "phone") {
                      if (!/^\d{10}$/.test(value)) {
                        setPhoneError("Phone number must be exactly 10 digits.");
                      } else {
                        setPhoneError("");
                      }
                    }
                  }}
                  placeholder={label}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
              ) : (
                <p className="text-sm">
                  {profile[key as keyof ProfileForm] || "—"}
                </p>
              )}
            </div>
          ))}

          {phoneError && (
            <p className="text-xs text-red-500 col-span-full">{phoneError}</p>
          )}

          {saved && (
            <p className="text-sm text-emerald-600 col-span-full">
              Profile updated successfully
            </p>
          )}
        </div>
      </section>

      {/* MY TRIPS */}
      <section className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-base font-semibold text-slate-900">
          My Trips
        </h2>

        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500">
            No trips booked yet.
          </p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              
            >
              <div className="flex justify-between text-base font-medium text-slate-600">
                <span>Booking Id: #{'PUR'+booking.id.slice(0, 8)}</span>
                <span className="text-emerald-600">
                  ₹{booking.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              {booking.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-xs text-slate-600"
                >
                  <span>
                    {item.package.title} • {item.membersCount} member(s)
                  </span>
                  <span>
                    ₹
                    {(item.membersCount * item.pricePerHead).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              ))}

              <p className="text-[11px] text-slate-500">
                Booked on{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}