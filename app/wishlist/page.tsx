//app/wishlist/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PackageCard } from "@/components/PackageCard";

type WishlistItem = {
  id: string;
  packageId: string;
  package: {
    id: string;
    title: string;
    location: string;
    shortInfo: string;
    price: number;
    imageUrl?: string | null;
    slug: string;
  };
};

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { status } = useSession();
  const router = useRouter();

  // Memoized fetch function
  const fetchWishlist = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/wishlist", { signal });
      
      if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      
      const data = await res.json();
      setWishlistItems(data);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("Failed to load wishlist. Please try again.");
        console.error("Wishlist fetch error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirectTo=/wishlist");
    }
  }, [status, router]);

  // Fetch wishlist items
  useEffect(() => {
    if (status !== "authenticated") {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    fetchWishlist(abortController.signal);

    return () => abortController.abort();
  }, [status, fetchWishlist]);

  // Show loading spinner
  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-600">Loading wishlist...</p>
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
              : `${wishlistItems.length} package${
                  wishlistItems.length !== 1 ? "s" : ""
                } saved`}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => {
                const abortController = new AbortController();
                fetchWishlist(abortController.signal);
              }}
              className="mt-2 text-sm font-semibold text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {isEmpty && !error && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <span className="text-4xl">💔</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              No saved packages yet
            </h3>
            <p className="mb-6 text-slate-600">
              Start exploring our packages and save your favorites!
            </p>
            <button
              onClick={() => router.push("/packages")}
              className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:from-sky-600 hover:to-teal-600 transition"
            >
              Browse Packages
            </button>
          </div>
        )}

        {/* Wishlist Grid */}
        {hasItems && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => (
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