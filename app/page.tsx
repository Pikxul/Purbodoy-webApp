// app/page.tsx

import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // HERO: 6 images
  const heroImages = await prisma.package.findMany({
    where: {
      status: "ACTIVE",
      imageUrl: { not: null },
    },
    select: {
      imageUrl: true,
    },
    take: 6,
  });

  // POPULAR DESTINATIONS
  const popularPackages = await prisma.package.findMany({
    where: {
      status: "ACTIVE",
      imageUrl: { not: null },
    },
    select: {
      id: true,
      title: true,
      location: true,
      imageUrl: true,
    },
    take: 3,
  });

  return (
    <main className="space-y-12">
      {/* Hero Section */}
      <section className="mt-6 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Purbodoy Tours & Travels
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Explore Incredible India with{" "}
            <span className="text-sky-700">Purbodoy</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base">
            Curated domestic trips across India — from beaches and mountains to
            heritage and culture. Book family, friends, or solo getaways with a
            smooth online experience.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/packages"
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition"
            >
              Browse Packages
            </Link>

            <Link
              href="/gallery"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              View Gallery
            </Link>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            India-only domestic trips • Handled by Purbodoy Tours & Travels
          </p>
        </div>

        {/* Hero Visual — CSS Carousel */}
        <div className="relative h-56 md:h-72 rounded-2xl border overflow-hidden carousel-container">
          <input type="checkbox" id="carousel-pause" className="carousel-pause-input" />
          
          <div className="carousel-track">
            {heroImages.map((img, i) => (
              <div key={i} className="carousel-slide">
                <Image
                  src={img.imageUrl!}
                  alt="Travel destination"
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Controls (Indicators + Play/Pause) */}
          <div className="carousel-controls">
            {/* Slide Indicators */}
            <div className="carousel-indicators">
              {heroImages.map((_, i) => (
                <div key={i} className="carousel-indicator" />
              ))}
            </div>

            {/* Play/Pause Button */}
            <label htmlFor="carousel-pause" className="carousel-play-pause">
              <span className="play-icon">▶</span>
              <span className="pause-icon">⏸</span>
            </label>
          </div>

          {/* Text Overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-2 px-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {/* Featured Journeys */}
            </p>
            <p className="text-sm md:text-base text-slate-800">
              {/* Northeast • Himachal • Goa • Rajasthan • Kerala */}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Why travel with Purbodoy?
        </h2>

        <p className="text-sm text-slate-600 max-w-2xl">
          This section will later be powered from CMS / admin, but for now
          we'll keep simple highlight cards to impress the client and structure
          the page.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              India-Only Experts
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Focused purely on domestic trips across India.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Curated Packages
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Thoughtfully designed itineraries with transparent pricing.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Assisted Booking
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Human support when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Destinations — FIXED */}
      <section className="space-y-4 pb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Popular Destinations
          </h2>

          <Link
            href="/packages"
            className="text-xs font-semibold text-sky-700 hover:text-sky-800"
          >
            View all packages →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {popularPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-40">
                <Image
                  src={pkg.imageUrl!}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500">{pkg.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews — untouched */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          What our travelers say
        </h2>

        <div className="grid gap-4 md:grid-cols-3 text-slate-600">
          {[
            {
              name: "Ankit Sharma",
              place: "Delhi",
              review:
                "Seamless experience from booking to travel. Purbodoy handled everything perfectly.",
            },
            {
              name: "Riya Das",
              place: "Kolkata",
              review:
                "The itinerary was well-planned and stress-free. Highly recommended.",
            },
            {
              name: "Arjun Mehta",
              place: "Mumbai",
              review:
                "Great support and transparent pricing. Loved it!",
            },
          ].map((r) => (
            <div
              key={r.name}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <p className="text-sm text-slate-700">"{r.review}"</p>
              <p className="mt-3 text-xs font-semibold">{r.name}</p>
              <p className="text-[11px] text-slate-500">{r.place}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .carousel-container {
          position: relative;
        }

        .carousel-pause-input,
        .carousel-radio {
          display: none;
        }

        .carousel-track {
          position: absolute;
          inset: 0;
          display: flex;
          transition: transform 0.6s ease-in-out;
          animation: carousel-auto-slide 30s infinite;
        }

        @keyframes carousel-auto-slide {
          0%, 16.66% { transform: translateX(0%); }
          16.67%, 33.33% { transform: translateX(-100%); }
          33.34%, 50% { transform: translateX(-200%); }
          50.01%, 66.66% { transform: translateX(-300%); }
          66.67%, 83.33% { transform: translateX(-400%); }
          83.34%, 100% { transform: translateX(-500%); }
        }

        .carousel-slide {
          position: relative;
          min-width: 100%;
          flex-shrink: 0;
        }

        /* Manual control via radio buttons */
        #slide-0:checked ~ .carousel-track { 
          transform: translateX(0%);
          animation: none;
        }
        #slide-1:checked ~ .carousel-track { 
          transform: translateX(-100%);
          animation: none;
        }
        #slide-2:checked ~ .carousel-track { 
          transform: translateX(-200%);
          animation: none;
        }
        #slide-3:checked ~ .carousel-track { 
          transform: translateX(-300%);
          animation: none;
        }
        #slide-4:checked ~ .carousel-track { 
          transform: translateX(-400%);
          animation: none;
        }
        #slide-5:checked ~ .carousel-track { 
          transform: translateX(-500%);
          animation: none;
        }

        /* Pause animation when paused */
        .carousel-pause-input:checked ~ .carousel-track {
          animation-play-state: paused;
        }

        /* Navigation Buttons */
        .carousel-nav-prev,
        .carousel-nav-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          display: flex;
        }

        .carousel-nav-prev {
          left: 1rem;
        }

        .carousel-nav-next {
          right: 1rem;
        }

        .carousel-nav-button {
          background: rgba(0, 0, 0, 0.5);
          color: white;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.5rem;
          transition: all 0.3s;
        }

        .carousel-nav-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        /* Controls Container */
        .carousel-controls {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 1rem;
        }

        .carousel-indicators {
          display: flex;
          gap: 0.5rem;
        }

        .carousel-indicator {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .carousel-indicator:hover {
          background: rgba(255, 255, 255, 0.75);
        }

        /* Auto-play indicator animation */
        @keyframes indicator-progress {
          0%, 16.66% { 
            background: white;
            width: 2rem;
          }
          16.67%, 100% { 
            background: rgba(255, 255, 255, 0.5);
            width: 0.5rem;
          }
        }

        .carousel-indicator:nth-child(1) {
          animation: indicator-progress 30s infinite;
          animation-delay: 0s;
        }

        .carousel-indicator:nth-child(2) {
          animation: indicator-progress 30s infinite;
          animation-delay: 5s;
        }

        .carousel-indicator:nth-child(3) {
          animation: indicator-progress 30s infinite;
          animation-delay: 10s;
        }

        .carousel-indicator:nth-child(4) {
          animation: indicator-progress 30s infinite;
          animation-delay: 15s;
        }

        .carousel-indicator:nth-child(5) {
          animation: indicator-progress 30s infinite;
          animation-delay: 20s;
        }

        .carousel-indicator:nth-child(6) {
          animation: indicator-progress 30s infinite;
          animation-delay: 25s;
        }

        .carousel-pause-input:checked ~ .carousel-controls .carousel-indicator {
          animation-play-state: paused;
        }

        .carousel-play-pause {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          width: 1.75rem;
          height: 1.75rem;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.75rem;
        }

        .carousel-play-pause:hover {
          transform: scale(1.1);
        }

        .carousel-play-pause .pause-icon {
          display: none;
        }

        .carousel-pause-input:checked ~ .carousel-controls .carousel-play-pause .play-icon {
          display: none;
        }

        .carousel-pause-input:checked ~ .carousel-controls .carousel-play-pause .pause-icon {
          display: block;
        }
      `}</style>
    </main>
  );
}