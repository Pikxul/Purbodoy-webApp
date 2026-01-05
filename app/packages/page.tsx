// app/packages/page.tsx

import { PackageCard } from "@/components/PackageCard";
import { prisma } from "@/lib/prisma";

export default async function PackagesPage() {
  // ✅ FETCH REAL PACKAGES FROM DB
  const packages = await prisma.package.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="space-y-12">
      {/* Header */}
      <section className="space-y-4">
        {/* Eyebrow / Badge */}
        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1 text-xs font-semibold text-amber-800">
          Handpicked Trips Across India
        </span>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          Explore Travel Packages
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Discover thoughtfully curated travel experiences across India —
          beaches, mountains, heritage cities, and hidden gems.
        </p>
      </section>

      {/* Grid */}
      <section>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageId={pkg.id}              // ✅ REAL DB ID
              title={pkg.title}
              location={pkg.location}
              tagLine={pkg.shortInfo}
              priceFrom={pkg.price}
              imageQuery={pkg.slug}
              imageUrl={pkg.imageUrl ?? undefined}
            />
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <p className="text-[11px] text-slate-400 pb-10 max-w-3xl">
        All packages are now served directly from the database. Pricing,
        availability, and images are managed dynamically for accuracy and
        scalability.
      </p>
    </main>
  );
}
