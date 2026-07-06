import { HeroSkeleton, DestinationSkeleton, Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9000] flex flex-col items-center bg-white/70 backdrop-blur-sm pointer-events-auto overflow-y-auto">
      <div className="w-full max-w-6xl space-y-24 p-8 animate-in fade-in duration-500 pt-24 md:pt-32">
        <HeroSkeleton />
        <div className="space-y-12">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-10 w-64 rounded-full" />
          </div>
          <DestinationSkeleton count={6} />
        </div>

        {/* Subtle status indicator */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-500"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            System Synchronizing
          </span>
        </div>
      </div>
    </div>
  );
}
