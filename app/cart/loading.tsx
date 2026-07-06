import { PageHeaderSkeleton, Skeleton } from "@/components/Skeleton";

export default function CartLoading() {
    return (
        <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-5xl space-y-10 py-12 animate-in fade-in duration-500">
                <PageHeaderSkeleton />
                <div className="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-50 pb-4 last:border-0">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>
                        ))}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
                        <Skeleton className="h-6 w-1/2" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-10 w-full rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
