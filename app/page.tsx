// app/page.tsx

import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import "./reviews-carousel.css";
import "./carousel.css";
import "./popular-destinations.css";
import "./customer-trust.css";
import HighlightsSection from "./components/HighlightsSection";

// Type definitions for better type safety
interface HeroImage {
  imageUrl: string | null;
}

interface PopularPackage {
  id: string;
  title: string;
  location: string;
  imageUrl: string | null;
}

interface Review {
  name: string;
  place: string;
  review: string;
  destination: string;
  rating: number;
  tripDate: string;
  tripDuration: string;
  tripType: string;
  verified: boolean;
}

/**
 * HomePage component for the Purbodoy Tours & Travels website.
 * Renders the main homepage with hero carousel, highlights, popular destinations, and reviews.
 *
 * @returns {JSX.Element} The homepage JSX element.
 */
export default async function HomePage() {
  // Fetch hero images for the carousel
  const heroImages: HeroImage[] = await prisma.package.findMany({
    where: {
      status: "ACTIVE",
      imageUrl: { not: null },
    },
    select: {
      imageUrl: true,
    },
    take: 6,
  });

  // Fetch popular destination packages
  const popularPackages: PopularPackage[] = await prisma.package.findMany({
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
    take: 6,
  });

  // Static reviews data with enhanced parameters
  const reviews: Review[] = [
    {
      name: "Ankit Sharma",
      place: "Delhi",
      destination: "Goa",
      rating: 5,
      tripDate: "December 2024",
      tripDuration: "5 Days",
      tripType: "Family",
      verified: true,
      review:
        "Seamless experience from booking to travel. Purbodoy handled everything perfectly. The beach resorts were amazing and the local sightseeing was well organized. Highly recommend for family trips!",
    },
    {
      name: "Riya Das",
      place: "Kolkata",
      destination: "Himachal Pradesh",
      rating: 5,
      tripDate: "November 2024",
      tripDuration: "7 Days",
      tripType: "Friends",
      verified: true,
      review:
        "The itinerary was well-planned and stress-free. Highly recommended. We explored Shimla, Manali, and the beautiful valleys. The accommodation was top-notch and the guides were very knowledgeable.",
    },
    {
      name: "Arjun Mehta",
      place: "Mumbai",
      destination: "Rajasthan",
      rating: 4,
      tripDate: "October 2024",
      tripDuration: "6 Days",
      tripType: "Couple",
      verified: true,
      review:
        "Great support and transparent pricing. Loved it! The palaces and forts were breathtaking. The cultural experience was authentic and the food was delicious. Minor delay in one transfer but overall excellent.",
    },
    {
      name: "Priya Singh",
      place: "Bangalore",
      destination: "Kerala",
      rating: 5,
      tripDate: "September 2024",
      tripDuration: "8 Days",
      tripType: "Solo",
      verified: true,
      review:
        "Backwaters, houseboats, and Ayurvedic treatments - everything was perfect! Purbodoy made my solo trip safe and memorable. The local experiences were authentic and the photography opportunities were endless.",
    },
    {
      name: "Vikram Patel",
      place: "Ahmedabad",
      destination: "Northeast India",
      rating: 5,
      tripDate: "August 2024",
      tripDuration: "10 Days",
      tripType: "Adventure",
      verified: true,
      review:
        "Unforgettable adventure through Meghalaya, Assam, and Arunachal. The biodiversity was incredible and the tribal culture was fascinating. Purbodoy's local guides made this trip truly special.",
    },
    {
      name: "Sneha Kapoor",
      place: "Pune",
      destination: "Ladakh",
      rating: 5,
      tripDate: "July 2024",
      tripDuration: "9 Days",
      tripType: "Adventure",
      verified: true,
      review:
        "Ladakh exceeded all expectations! The high-altitude lakes, monasteries, and landscapes were breathtaking. Purbodoy arranged everything perfectly including acclimatization stops. The local culture and cuisine were amazing.",
    },
    {
      name: "Rahul Verma",
      place: "Jaipur",
      destination: "Andaman & Nicobar",
      rating: 5,
      tripDate: "June 2024",
      tripDuration: "7 Days",
      tripType: "Family",
      verified: true,
      review:
        "Perfect family getaway to the Andamans! Crystal clear waters, pristine beaches, and amazing snorkeling. The resorts were luxurious and the island hopping was well organized. Kids loved the water activities!",
    },
    {
      name: "Kavita Jain",
      place: "Chennai",
      destination: "Uttarakhand",
      rating: 4,
      tripDate: "May 2024",
      tripDuration: "6 Days",
      tripType: "Spiritual",
      verified: true,
      review:
        "Spiritual journey to the Himalayas was transformative. Visited Rishikesh, Haridwar, and several ashrams. The accommodation was comfortable and the local guides were very knowledgeable about spiritual practices.",
    },
    {
      name: "Amit Kumar",
      place: "Hyderabad",
      destination: "Sikkim & Darjeeling",
      rating: 5,
      tripDate: "April 2024",
      tripDuration: "8 Days",
      tripType: "Photography",
      verified: true,
      review:
        "Darjeeling and Sikkim were paradise for photographers! The tea gardens, monasteries, and mountain views were incredible. Purbodoy helped us get the best vantage points and arranged photography workshops.",
    },
  ];

  return (
    <main className="">
      {/* Hero Section */}
      <section className="pt-8 md:pt-5 pb-16 md:pb-20 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
            Purbodoy Tours & Travels
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Explore Incredible India with{" "}
            <span className="text-sky-700 bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">Purbodoy</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-lg">
            Curated domestic trips across India — from pristine beaches and majestic mountains to
            rich heritage and vibrant culture. Book unforgettable family, friends, or solo getaways with a
            seamless online experience.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/packages"
              className="group rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Browse Packages
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>

            <Link
              href="/gallery"
              className="group rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              View Gallery
            </Link>
          </div>

          <p className="text-sm text-slate-500 pt-2 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-gradient-to-r from-sky-400 to-sky-600"></span>
            India-only domestic trips • Handled by Purbodoy Tours & Travels
            <span className="inline-block w-8 h-px bg-gradient-to-r from-sky-600 to-sky-400"></span>
          </p>
        </div>

        {/* Hero Visual — CSS Carousel */}
        <div className="relative h-72 md:h-96 rounded-3xl border-0 overflow-hidden carousel-container shadow-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
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

          {/* Controls (Indicators only) */}
          <div className="carousel-controls">
            {/* Slide Indicators */}
            <div className="carousel-indicators">
              {heroImages.map((_, i) => (
                <div key={i} className="carousel-indicator" />
              ))}
            </div>
          </div>

          {/* Text Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center space-y-3 px-6">
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12">
        <HighlightsSection />
      </section>

      {/* Popular Destinations — Enhanced for Mobile */}
      <section className="py-12 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Handpicked Collections for You
          </h2>

          <Link
            href="/packages"
            className="text-xs font-semibold text-sky-700 hover:text-sky-800"
          >
            View all packages →
          </Link>
        </div>

        <div className="popular-destinations-container">
          {popularPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="popular-card rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
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
          {/* Swipe hint for mobile */}
          <div className="popular-swipe-hint flex-shrink-0 flex items-center justify-center w-16 text-slate-400 text-sm md:hidden">
            →
          </div>
        </div>
      </section>

      {/* Reviews — Horizontal Sliding Carousel */}
      <section className="py-12 space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          What our travelers say
        </h2>

        <div className="reviews-carousel-container">
          <div className="reviews-carousel-track">
            {/* Duplicate reviews for seamless continuous loop */}
            {[...reviews, ...reviews].map((r, index) => (
              <div key={`${r.name}-${index}`} className="review-card">
                <div className="review-header">
                  <div className="quote-icon">
                    <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                    </svg>
                  </div>
                  {r.verified && (
                    <div className="verified-badge">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-xs text-green-600 font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <div className="stars">
                  {[...Array(r.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="review-text">"{r.review}"</p>

                <div className="review-footer">
                  <div className="reviewer-info">
                    <p className="reviewer-name">{r.name}</p>
                    <p className="reviewer-place">{r.place}</p>
                  </div>
                  <div className="trip-destination">
                    <p className="trip-label">Trip to</p>
                    <p className="font-semibold">{r.destination}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Trust Parameters */}
        <div className="customer-trust-section">
          <div className="trust-metrics">
            <div className="metric-item">
              <div className="metric-icon">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="metric-number">100,000+</div>
              <div className="metric-label">Happy Travelers</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="metric-number">200+</div>
              <div className="metric-label">Destinations</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="metric-number">15+</div>
              <div className="metric-label">Years Of Experience</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4h-2V2h-4v2H8C5.79 4 4 5.79 4 8v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-1 10H9v-2h6v2zm0-4H9V8h6v2z"/>
                </svg>
              </div>
              <div className="metric-number">98%</div>
              <div className="metric-label">Satisfaction Rate</div>
            </div>
            <div className="metric-item rating-highlight">
              <div className="metric-icon">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <div className="metric-number">4.8</div>
              <div className="metric-label">Average Rating</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="metric-number">100+</div>
              <div className="metric-label">Customer Assistants</div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}