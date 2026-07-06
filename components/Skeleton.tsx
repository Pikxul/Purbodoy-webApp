import React from "react";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`relative overflow-hidden rounded-md bg-slate-200/60 
            before:absolute before:inset-0 before:-translate-x-full 
            before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r 
            before:from-transparent before:via-white/40 before:to-transparent ${className}`}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-10">
                <Skeleton className="h-12 w-64 rounded-full" />
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-3/4" />
                </div>
                <div className="space-y-4 py-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-14 w-44 rounded-full" />
                    <Skeleton className="h-14 w-44 rounded-full" />
                </div>
                {/* User trust placeholder */}
                <div className="flex items-center gap-4 pt-6">
                    <Skeleton className="h-12 w-36 rounded-full" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
            <Skeleton className="h-[450px] w-full rounded-[100px] md:h-[550px]" />
        </div>
    );
}

export function PageHeaderSkeleton() {
    return (
        <div className="mb-8 space-y-3">
            <Skeleton className="h-10 w-1/3 sm:w-1/4" />
            <Skeleton className="h-4 w-1/2 sm:w-1/3" />
        </div>
    );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

export function DestinationSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="popular-destinations-container pb-8 items-start flex gap-4 overflow-hidden">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="popular-card flex-shrink-0 w-[280px]">
                    <div className="relative h-64 w-full rounded-[32px] overflow-hidden bg-slate-100 ring-1 ring-slate-200/50 shadow-sm animate-pulse">
                        <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                            <Skeleton className="h-2 w-16" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
