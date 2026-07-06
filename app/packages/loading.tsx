import { GridSkeleton, PageHeaderSkeleton } from "@/components/Skeleton";

export default function PackagesLoading() {
    return (
        <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-6xl space-y-8 py-12 animate-in fade-in duration-500">
                <PageHeaderSkeleton />
                <GridSkeleton count={8} />
            </div>
        </div>
    );
}
