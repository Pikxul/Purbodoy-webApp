import { PrismaClient, PackageStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding packages...");

  await prisma.package.createMany({
    data: [
      {
        title: "Goa Beach Escape – 4D/3N",
        slug: "goa-beach-escape",
        shortInfo: "Sun, sand, shacks & nightlife.",
        price: 8999,
        location: "Goa, India",
        state: "Goa",
        status: PackageStatus.ACTIVE,
        imageUrl: "/images/goa.jpg",
      },
      {
        title: "Himalayan Retreat – Manali",
        slug: "manali-himalayan-retreat",
        shortInfo: "Snow peaks & scenic drives.",
        price: 11999,
        location: "Manali, Himachal Pradesh",
        state: "Himachal Pradesh",
        status: PackageStatus.ACTIVE,
        imageUrl: "/images/manali.jpg",
      },
      {
        title: "Royal Rajasthan Heritage Trail",
        slug: "rajasthan-heritage",
        shortInfo: "Forts, palaces & royal vibes.",
        price: 14999,
        location: "Rajasthan, India",
        state: "Rajasthan",
        status: PackageStatus.ACTIVE,
        imageUrl: "/images/rajasthan.jpg",
      },
      {
        title: "Andaman Islands Adventure",
        slug: "andaman-adventure",
        shortInfo: "Tropical beaches & marine life.",
        price: 16999,
        location: "Andaman Islands, India",
        state: "Andaman & Nicobar Islands",
        status: PackageStatus.ACTIVE,
        imageUrl: "/images/andaman.jpg",
      },
      {
        title: "Kerala Backwaters Experience",
        slug: "kerala-backwaters",
        shortInfo: "Lush greenery & serene waterways.",
        price: 18999,
        location: "Kerala, India",
        state: "Kerala",
        status: PackageStatus.ACTIVE,
        imageUrl: "/images/kerala.jpg",
      },
      {
        title: "North East India Explorer",
        slug: "north-east-india-explorer",
        shortInfo: "Tropical forests & vibrant cultures.",
        price: 12999,
        location: "North East India",
        state: "Assam",
        status: PackageStatus.ACTIVE,
        imageUrl: "/images/north-east.jpg",
      },

    ],
    skipDuplicates: true, // ✅ safe re-run
  });

  console.log("✅ Packages seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
