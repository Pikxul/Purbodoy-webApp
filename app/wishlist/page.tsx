//app/wishlist/page.tsx

"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PackageCard } from "@/components/PackageCard";
import { useWishlist, WishlistItem } from "@/components/wishlist-context";
import { GridSkeleton, PageHeaderSkeleton } from "@/components/Skeleton";

export default function WishlistPage() {
  const { wishlistItems, isLoading, refreshWishlist } = useWishlist();
  const { status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirectTo=/wishlist");
    }
  }, [status, router]);

  // Show loading skeleton
  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <PageHeaderSkeleton />
          <GridSkeleton count={4} />
        </div>
      </div>
    );
  }

  // Redirect handling (show nothing while redirecting)
  if (status === "unauthenticated") {
    return null;
  }

  const isEmpty = wishlistItems.length === 0;
  const hasItems = wishlistItems.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            My Wishlist ❤️
          </h1>
          <p className="text-slate-600">
            {isEmpty
              ? "Your wishlist is empty"
              : `${wishlistItems.length} package${wishlistItems.length !== 1 ? "s" : ""
              } saved`}
          </p>
        </div>

        {/* Empty State */}
        {isEmpty && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 italic grayscale opacity-75">
              <span className="text-4xl">🏔️</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Your wishlist is lonely
            </h3>
            <p className="mb-6 text-slate-600 max-w-sm mx-auto">
              Save the destinations you love and they'll appear here. Your next adventure is just a heart-click away!
            </p>
            <button
              onClick={() => router.push("/packages")}
              className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-8 py-3 text-sm font-semibold text-white shadow-md hover:from-sky-600 hover:to-teal-600 transition transform hover:scale-105 active:scale-95"
            >
              Explore Destinations
            </button>
          </div>
        )}

        {/* Wishlist Grid */}
        {hasItems && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item: WishlistItem) => (
              <PackageCard
                key={item.id}
                packageId={item.package.id}
                title={item.package.title}
                location={item.package.location}
                tagLine={item.package.shortInfo}
                priceFrom={item.package.price}
                imageQuery={item.package.slug}
                imageUrl={item.package.imageUrl ?? undefined}
              />
            ))}
          </div>
        )}

        {/* Quick actions */}
        {hasItems && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Ready to book?
              </h3>
              <p className="text-sm text-slate-600">
                Add your favorite packages to cart and proceed to checkout
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/packages")}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Browse More
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-sky-600 hover:to-teal-600 transition"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}