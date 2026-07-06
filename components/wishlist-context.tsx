"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useSession } from "next-auth/react";

export interface WishlistItem {
    id: string; // ID of the wishlist entry itself
    packageId: string; // ID of the package
    package: {
        id: string;
        title: string;
        location: string;
        shortInfo: string;
        price: number;
        imageUrl?: string | null;
        slug: string;
    };
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    wishlistIds: Set<string>; // For quick lookup
    isLoading: boolean;
    toggleWishlist: (packageId: string, fullPackage?: WishlistItem['package']) => Promise<void>;
    isWishlisted: (packageId: string) => boolean;
    refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const { status } = useSession();

    const fetchWishlist = useCallback(async () => {
        if (status !== "authenticated") {
            setWishlistItems([]);
            setWishlistIds(new Set());
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/wishlist");
            if (res.ok) {
                const data = await res.json();
                setWishlistItems(data);
                const ids = new Set<string>(data.map((item: any) => item.packageId));
                setWishlistIds(ids);
            }
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    }, [status]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const toggleWishlist = async (packageId: string, fullPackage?: WishlistItem['package']) => {
        if (status !== "authenticated") return;

        const isCurrentlyWishlisted = wishlistIds.has(packageId);

        // Optimistic update for IDs
        setWishlistIds((prev: Set<string>) => {
            const newSet = new Set(prev);
            if (isCurrentlyWishlisted) {
                newSet.delete(packageId);
            } else {
                newSet.add(packageId);
            }
            return newSet;
        });

        // Optimistic update for Items
        if (isCurrentlyWishlisted) {
            setWishlistItems((prev: WishlistItem[]) => prev.filter(item => item.packageId !== packageId));
        } else if (fullPackage) {
            const newItem: WishlistItem = {
                id: `temp-${Date.now()}`,
                packageId,
                package: fullPackage
            };
            setWishlistItems((prev: WishlistItem[]) => [newItem, ...prev]);
        }

        try {
            if (isCurrentlyWishlisted) {
                const res = await fetch(`/api/wishlist?packageId=${packageId}`, {
                    method: "DELETE",
                });
                if (!res.ok) throw new Error("Delete failed");
            } else {
                const res = await fetch("/api/wishlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ packageId }),
                });
                if (!res.ok) throw new Error("Add failed");

                if (!fullPackage) {
                    await fetchWishlist();
                } else {
                    const addedItem = await res.json();
                    setWishlistItems((prev: WishlistItem[]) =>
                        prev.map(item => item.packageId === packageId ? addedItem : item)
                    );
                }
            }
        } catch (error) {
            console.error("Wishlist toggle error:", error);
            fetchWishlist();
        }
    };

    const isWishlisted = (packageId: string) => wishlistIds.has(packageId);

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistIds,
                isLoading,
                toggleWishlist,
                isWishlisted,
                refreshWishlist: fetchWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
