import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      coPassengers: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH /api/profile
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    },
  });

  return NextResponse.json(updatedUser);
}

// POST /api/profile/copassenger
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fullName, dateOfBirth, relation } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const coPassenger = await prisma.coPassenger.create({
    data: {
      userId: user.id,
      fullName,
      relation,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    },
  });

  return NextResponse.json(coPassenger, { status: 201 });
}

// DELETE /api/profile/copassenger?id=...
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const coPassenger = await prisma.coPassenger.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!coPassenger || coPassenger.user.email !== session.user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.coPassenger.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
