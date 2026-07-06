import { Skeleton, PageHeaderSkeleton } from "@/components/Skeleton";

export default function CheckoutLoading() {
    return (
        <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-6xl space-y-10 py-12 animate-in fade-in duration-500">
                <PageHeaderSkeleton />
                <div className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
                    <div className="space-y-8">
                        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <Skeleton className="h-6 w-1/4" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full col-span-full" />
                            </div>
                        </section>
                        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <Skeleton className="h-6 w-1/4" />
                            <div className="space-y-3">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </section>
                    </div>
                    <aside className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
                        <Skeleton className="h-6 w-1/2" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-full" />
                    </aside>
                </div>
            </div>
        </div>
    );
}
