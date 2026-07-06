"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWishlist } from "./wishlist-context";

type PackageCardProps = {
  packageId: string; // ✅ Prisma Package.id
  title: string;
  location: string;
  tagLine: string;
  priceFrom: number;
  imageQuery: string;
  imageUrl?: string;
};

export function PackageCard({
  packageId,
  title,
  location,
  tagLine,
  priceFrom,
  imageQuery,
  imageUrl,
}: PackageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { items, addItem } = useCart();
  const { toggleWishlist, isWishlisted, isLoading: wishlistChecking } = useWishlist();
  const { status } = useSession();
  const router = useRouter();

  const wishlisted = isWishlisted(packageId);

  // ✅ CART CHECK
  const isInCart = items.some(
    (item) => item.packageId === packageId
  );

  const fallbackImgUrl = `https://picsum.photos/seed/${encodeURIComponent(
    imageQuery
  )}/800/600`;

  const finalImgUrl =
    imageUrl && !imageError ? imageUrl : fallbackImgUrl;

  /**
   * ❤️ Wishlist toggle
   */
  const handleWishlistToggle = async () => {
    if (status !== "authenticated") {
      router.push(`/login?redirectTo=/packages`);
      return;
    }

    if (wishlistLoading) return;

    setWishlistLoading(true);
    try {
      await toggleWishlist(packageId);
    } finally {
      setWishlistLoading(false);
    }
  };

  /**
   * 🛒 Add to cart
   */
  const handleAddToCart = () => {
    if (status !== "authenticated") {
      router.push("/login?redirectTo=/packages");
      return;
    }

    if (isInCart) return;

    addItem({
      packageId,
      title,
      location,
      pricePerHead: priceFrom,
      members: 1,
    });
  };

  return (
    <div className="group overflow-hidden rounded-[32px] border-0 bg-white premium-shadow premium-shadow-hover transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {!imageError && (
          <img
            src={finalImgUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        {/* ❤️ Wishlist button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
          disabled={wishlistChecking || wishlistLoading}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-lg hover:scale-110 active:scale-90 transition-all duration-300 disabled:opacity-70 disabled:cursor-wait group/wishlist"
        >
          {wishlistChecking ? (
            <svg className="h-5 w-5 animate-spin text-slate-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : wishlisted ? (
            <svg className="h-5 w-5 text-red-500 fill-current drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-slate-700 transition-colors group-hover/wishlist:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>

        {/* Image content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">
              {location}
            </p>
            <h3 className="text-lg sm:text-xl font-black text-white leading-[1.1] tracking-tight">
              {title}
            </h3>
            <p className="mt-1 text-[11px] sm:text-xs font-medium text-slate-200/90 line-clamp-1 sm:line-clamp-2 leading-relaxed">
              {tagLine}
            </p>
          </div>

          {/* Price badge */}
          <div className="rounded-2xl glass-morphism px-4 py-2.5 text-right shadow-2xl">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">From</p>
            <p className="text-base font-black text-slate-900 tracking-tighter">
              ₹{priceFrom.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 bg-white">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-0.5">
            Curated Experience
          </span>
          <span className="text-[11px] font-bold text-slate-400">
            Handpicked by Purbodoy
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isInCart
              ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
              : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:scale-105 active:scale-95 focus:ring-slate-900"
            }
          `}
        >
          {isInCart ? "In Cart ✓" : "Book Now"}
        </button>
      </div>
    </div>
  );
}