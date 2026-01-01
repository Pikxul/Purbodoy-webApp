//app/profile/loading.tsx


"use client";

export default function ProfileLoading() {
  return (
    <main className="space-y-16 pb-16 animate-pulse">
      {/* PROFILE HEADER SKELETON */}
      <section className="rounded-2xl border bg-white shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-56 rounded bg-slate-100" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="h-9 w-24 rounded-md bg-slate-200" />
            <div className="h-9 w-24 rounded-md bg-slate-100" />
          </div>
        </div>

        {/* PROFILE DETAILS SKELETON */}
        <div className="border-t p-6 grid gap-6 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 rounded bg-slate-100" />
              <div className="h-9 w-full rounded-md bg-slate-200" />
            </div>
          ))}
        </div>
      </section>

      {/* MY TRIPS SKELETON */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <div className="h-4 w-24 rounded bg-slate-200" />

        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-slate-50 p-4 space-y-2"
          >
            <div className="flex justify-between">
              <div className="h-3 w-40 bg-slate-200 rounded" />
              <div className="h-3 w-20 bg-slate-200 rounded" />
            </div>

            <div className="h-3 w-64 bg-slate-100 rounded" />
            <div className="h-3 w-48 bg-slate-100 rounded" />
          </div>
        ))}
      </section>
    </main>
  );
}
