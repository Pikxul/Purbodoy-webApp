"use client";

import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PopularPackage {
    id: string;
    title: string;
    location: string;
    imageUrl: string | null;
    price: number;
    shortInfo: string;
}

interface PopularPackagesClientProps {
    packages: PopularPackage[];
}

export default function PopularPackagesClient({ packages }: PopularPackagesClientProps) {
    const { addItem, items } = useCart();
    const { status } = useSession();
    const router = useRouter();
    const [addingId, setAddingId] = useState<string | null>(null);

    const handleAdd = (pkg: PopularPackage) => {
        if (status !== "authenticated") {
            router.push(`/login?redirectTo=/`);
            return;
        }

        const isInCart = items.some((item) => item.packageId === pkg.id);
        if (isInCart) return;

        setAddingId(pkg.id);
        addItem({
            packageId: pkg.id,
            title: pkg.title,
            location: pkg.location,
            pricePerHead: pkg.price,
            members: 1,
        });

        // Reset adding state after a brief moment
        setTimeout(() => setAddingId(null), 1000);
    };

    return (
        <div className="popular-destinations-container pb-8 items-start">
            {packages.map((pkg) => {
                const isInCart = items.some((item) => item.packageId === pkg.id);
                const isAdding = addingId === pkg.id;

                return (
                    <div
                        key={pkg.id}
                        className="popular-card group relative rounded-[32px] overflow-hidden border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2"
                    >
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src={pkg.imageUrl || "https://picsum.photos/seed/travel/800/600"}
                                alt={pkg.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/70">{pkg.location}</p>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {pkg.title}
                            </h3>
                            <p className="text-[10px] font-medium text-white/60 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {pkg.shortInfo}
                            </p>
                        </div>

                        <button
                            onClick={() => handleAdd(pkg)}
                            disabled={isInCart}
                            className={`absolute top-4 right-4 h-11 w-11 rounded-full glass-morphism flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 cursor-pointer hover:scale-110 active:scale-90
                ${isInCart ? "bg-teal-500/80 text-white border-teal-400 opacity-100 translate-x-0" : "text-slate-900"}
              `}
                            title={isInCart ? "Added to cart" : "Add to cart"}
                        >
                            {isAdding ? (
                                <svg className="h-5 w-5 animate-spin text-slate-900" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : isInCart ? (
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
