// app/api/bookings/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/bookings
 * Create a booking for the logged-in user
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, totalAmount } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No booking items" },
        { status: 400 }
      );
    }

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // CREATE BOOKING (ALIGNED WITH CHECKOUT + PRISMA)
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        totalAmount,
        status: "CONFIRMED", // MVP: confirmed directly
        items: {
          create: items.map((item: any) => ({
            packageId: item.packageId,       // FIXED
            location: item.location,
            membersCount: item.membersCount, // FIXED
            pricePerHead: item.pricePerHead,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("BOOKING_CREATE_ERROR", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bookings
 * Fetch bookings of logged-in user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        user: { email: session.user.email },
      },
      include: {
        items: {
          include: {
            package: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("BOOKING_FETCH_ERROR", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
