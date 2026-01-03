import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/profile
 * Fetch logged-in user's profile
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        image: true,
        dateOfBirth: true,
        whatsappOptIn: true,
        emailOptIn: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("PROFILE_GET_ERROR", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/profile
 * Update user's profile fields
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      name,
      phone,
      address,
      image,
      dateOfBirth,
      whatsappOptIn,
      emailOptIn,
    } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone,
        address,
        image,
        whatsappOptIn,
        emailOptIn,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth)
          : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        image: true,
        dateOfBirth: true,
        whatsappOptIn: true,
        emailOptIn: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
