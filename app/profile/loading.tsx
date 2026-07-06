import { Skeleton } from "@/components/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-4xl space-y-16 py-12 animate-in fade-in duration-500">
        {/* Profile card skeleton */}
        <section className="relative rounded-2xl bg-white shadow-lg border border-slate-100 overflow-hidden">
          <div className="absolute top-4 right-4 h-9 w-28 rounded bg-slate-100 animate-pulse" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          <div className="p-6 grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Trips skeleton */}
        <section className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100 space-y-6">
          <Skeleton className="h-4 w-24" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-50 p-4 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
