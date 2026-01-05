// app/components/PackageCard.tsx

"use client";

import { useState } from "react";
import { useCart } from "./cart-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  const { items, addItem } = useCart();
  const { status } = useSession();
  const router = useRouter();

  // ✅ CORRECT CART CHECK (packageId)
  const isInCart = items.some(
    (item) => item.packageId === packageId
  );

  const fallbackImgUrl = `https://picsum.photos/seed/${encodeURIComponent(
    imageQuery
  )}/800/600`;

  const finalImgUrl =
    imageUrl && !imageError ? imageUrl : fallbackImgUrl;

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
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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

        {/* Gradient overlay – travel mood */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        {/* Image content */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-amber-300">
              {location}
            </p>
            <h3 className="text-sm font-semibold text-white leading-tight">
              {title}
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-200 line-clamp-1 sm:line-clamp-2">
              {tagLine}
            </p>
          </div>

          {/* Price badge */}
          <div className="rounded-xl bg-white/95 backdrop-blur px-3 py-1.5 text-right shadow-md">
            <p className="text-[10px] text-slate-500">From</p>
            <p className="text-sm font-bold text-slate-900">
              ₹{priceFrom.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-50">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-teal-600">
            Curated Experience
          </span>
          <span className="text-[11px] text-slate-500">
            Handpicked by Purbodoy
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`rounded-full px-4 py-1.5 text-[11px] font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              isInCart
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:from-sky-600 hover:to-teal-600 focus:ring-teal-400"
            }
          `}
        >
          {isInCart ? "Added to cart ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
