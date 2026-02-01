// app/api/wishlist/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path to your auth config
import { prisma } from "@/lib/prisma"; // Adjust path to your prisma client

/**
 * GET /api/wishlist
 * Fetch all wishlist items for the authenticated user with full package details
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch wishlist items with full package data included
    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        package: {
          select: {
            id: true,
            title: true,
            location: true,
            shortInfo: true,  // This is tagLine
            price: true,       // This is priceFrom
            imageUrl: true,
            slug: true,        // This is imageQuery
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Most recently added first
      },
    });

    return NextResponse.json(wishlistItems);
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wishlist
 * Add a package to the user's wishlist
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packageId } = await req.json();

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if package exists
    const packageExists = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!packageExists) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    // Check if already wishlisted
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        userId: user.id,
        packageId: packageId,
      },
    });

    if (existingWishlist) {
      return NextResponse.json(
        { error: "Package already in wishlist" },
        { status: 400 }
      );
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: user.id,
        packageId: packageId,
      },
      include: {
        package: {
          select: {
            id: true,
            title: true,
            location: true,
            shortInfo: true,  // This is tagLine
            price: true,       // This is priceFrom
            imageUrl: true,
            slug: true,        // This is imageQuery
          },
        },
      },
    });

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wishlist
 * Remove a package from the user's wishlist
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("packageId");

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete from wishlist
    const deleted = await prisma.wishlist.deleteMany({
      where: {
        userId: user.id,
        packageId: packageId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: "Wishlist item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deleted: deleted.count });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}