// app/page.tsx

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { REVIEWS, type Review } from "@/lib/constants";
import "./reviews-carousel.css";
import "./carousel.css";
import "./popular-destinations.css";
import "./customer-trust.css";
import HighlightsSection from "./components/HighlightsSection";
import PopularPackagesClient from "./components/PopularPackagesClient";

// Type definitions for better type safety
interface HeroImage {
  imageUrl: string | null;
}

interface PopularPackage {
  id: string;
  title: string;
  location: string;
  imageUrl: string | null;
  price: number;
  shortInfo: string;
}

/**
 * HomePage component for the Purbodoy Tours & Travels website.
 * Renders the main homepage with hero carousel, highlights, popular destinations, and reviews.
 *
 * @returns {Promise<JSX.Element>} The homepage JSX element.
 */
export default async function HomePage() {
  let heroImages: HeroImage[] = [];
  let popularPackages: PopularPackage[] = [];

  try {
    // Fetch hero images for the carousel
    heroImages = await prisma.package.findMany({
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
    popularPackages = await prisma.package.findMany({
      where: {
        status: "ACTIVE",
        imageUrl: { not: null },
      },
      select: {
        id: true,
        title: true,
        location: true,
        imageUrl: true,
        price: true,
        shortInfo: true,
      },
      take: 6,
    });
  } catch (error) {
    console.error("Failed to fetch data from database:", error);
    // Fallback data so the page doesn't crash visually during DB outages
    heroImages = [
      { imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1492136344046-866c85e0bf04?q=80&w=2028&auto=format&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069&auto=format&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" }
    ];
    popularPackages = [
      { id: "fallback-1", title: "Taj Mahal Tour", location: "Agra", imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop", price: 5000, shortInfo: "Visit the symbol of love" },
      { id: "fallback-2", title: "Kerala Backwaters", location: "Kerala", imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2071&auto=format&fit=crop", price: 15000, shortInfo: "Relax in nature's lap" },
      { id: "fallback-3", title: "Goa Beaches", location: "Goa", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?q=80&w=2069&auto=format&fit=crop", price: 12000, shortInfo: "Sun, sand and sea" }
    ];
  }

  return (

    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-28 pb-20 md:pb-40">
        {/* Cinematic Organic Blobs */}
        <div className="absolute top-20 right-[-10%] -z-10 h-[600px] w-[600px] organic-blob bg-sky-400/10 animate-[float-slow_20s_infinite]" />
        <div className="absolute bottom-20 left-[-10%] -z-10 h-[500px] w-[500px] organic-blob bg-teal-400/15 animate-[float-slow_25s_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[800px] w-[800px] organic-blob bg-indigo-200/5 animate-subtle-pulse" />

        <div className="grid gap-24 md:grid-cols-2 md:items-center">
          <div className="space-y-12 animate-cinematic">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-100/70 backdrop-blur-xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.4em] text-sky-900 ring-1 ring-white/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Purbodoy Tours & Travels
            </div>

            <h1 className="text-7xl md:text-8xl lg:text-[8rem] font-black text-slate-900 leading-[0.8] tracking-tighter">
              Discover <br />
              <span className="vibrant-gradient-sky bg-clip-text text-transparent italic pr-4 text-glow">Incredible</span> <br />
              India
            </h1>

            <div className="rounded-[40px] p-2 max-w-xl animate-fade-in-up delay-100">
              <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                Curated domestic escapes across the subcontinent. From snow-capped peaks to tropical shores, we craft moments that last a lifetime.
              </p>

              <div className="flex flex-wrap gap-5 pt-10">
                <Link
                  href="/packages"
                  className="group rounded-full bg-slate-900 px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-800 transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-4"
                >
                  Explore Trips
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>

                <Link
                  href="/gallery"
                  className="group rounded-full border border-slate-200 bg-white/60 backdrop-blur-xl px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-700 hover:bg-white hover:border-slate-300 transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-4"
                >
                  Gallery
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-fade-in-up delay-300">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-100 ring-1 ring-slate-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" className="h-full w-full object-cover" />
                  </div>
                ))}
                <div className="h-12 w-12 rounded-full border-4 border-white bg-gradient-to-tr from-sky-500 to-teal-500 flex items-center justify-center text-[10px] text-white ring-1 ring-sky-500 font-black relative z-10">
                  +1K
                </div>
              </div>
              <span className="leading-tight">Hand-picked by<br />Purbodoy Experts</span>
            </div>
          </div>

          {/* Hero Visual — Frameless & Wise Fit */}
          <div className="relative h-[450px] md:h-[550px] w-full carousel-container group/hero animate-cinematic delay-300">
            {/* Organic Edge Masking — Softer */}
            <div className="absolute inset-0 z-10 pointer-events-none rounded-[100px] ring-[40px] ring-white ring-inset opacity-50 blur-3xl" />

            <div className="relative h-full w-full rounded-[100px] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-slate-900/30 pointer-events-none" />

              {/* Carousel Control Inputs */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input key={i} type="radio" name="carousel" id={`slide-${i}`} className="carousel-radio" />
              ))}
              <input type="checkbox" id="pause" className="carousel-pause-input" />

              <div className="carousel-track h-full">
                {heroImages.map((img, i) => (
                  <div key={i} className="carousel-slide h-full overflow-hidden">
                    <Image
                      src={img.imageUrl!}
                      alt="Travel destination"
                      fill
                      className="object-cover animate-ken-burns"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Controls — High Fidelity */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const prev = i === 0 ? 5 : i - 1;
                const next = i === 5 ? 0 : i + 1;
                return (
                  <div key={i} className="carousel-nav-group absolute inset-0 z-20 pointer-events-none opacity-0 group-checked:opacity-100 transition-opacity duration-500">
                    <label htmlFor={`slide-${prev}`} className="carousel-nav-prev pointer-events-auto cursor-pointer absolute left-6 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500 hover:scale-110 active:scale-90">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </label>
                    <label htmlFor={`slide-${next}`} className="carousel-nav-next pointer-events-auto cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500 hover:scale-110 active:scale-90">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-8 -left-8 z-30 animate-[float-slow_10s_infinite]">
              <div className="glass-morphism rounded-3xl p-6 border border-white/40 shadow-2xl flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Premium Choice</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">A+ Travel Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section — Softened for Light Mode */}
      <section className="relative py-32 px-4 overflow-hidden">
        <HighlightsSection />
      </section>

      {/* Popular Destinations */}
      <section className="py-32 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600">Top Destinations</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter">
              Curated Just for You
            </h2>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-sky-600 transition-colors"
          >
            Explore all <span className="h-px w-10 bg-slate-200 group-hover:bg-sky-500" />
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>

        <PopularPackagesClient packages={popularPackages} />
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-slate-50/50 rounded-[80px] px-4 space-y-12 overflow-hidden">
        <div className="text-center space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-teal-600">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Voices of Adventure
          </h2>
        </div>

        <div className="reviews-carousel-container relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          <div className="reviews-carousel-track px-16">
            {[...REVIEWS, ...REVIEWS].map((r, index) => (
              <div key={`${r.name}-${index}`} className="review-card group hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                    </svg>
                  </div>
                  {r.verified && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">Verified</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 italic font-medium leading-relaxed mb-8">"{r.review}"</p>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight">{r.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.place}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Trip to</p>
                    <p className="text-xs font-black text-slate-900">{r.destination}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Trust — Final Polish */}
        <div className="max-w-6xl mx-auto pt-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-slate-900 uppercase font-black tracking-widest text-[10px]">
            <div className="space-y-4 group animate-fade-in-up">
              <div className="mx-auto h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:vibrant-gradient-sky group-hover:text-white transition-all duration-500">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
              <div className="text-lg font-black tracking-tighter">10k+</div>
              <div>Happy Travelers</div>
            </div>

            <div className="space-y-4 group animate-fade-in-up delay-100">
              <div className="mx-auto h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:vibrant-gradient-sky group-hover:text-white transition-all duration-500">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
              </div>
              <div className="text-lg font-black tracking-tighter">200+</div>
              <div>Destinations</div>
            </div>

            <div className="space-y-4 group animate-fade-in-up delay-200">
              <div className="mx-auto h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:vibrant-gradient-sky group-hover:text-white transition-all duration-500">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              </div>
              <div className="text-lg font-black tracking-tighter">15+</div>
              <div>Experience</div>
            </div>

            <div className="space-y-4 group animate-fade-in-up delay-300">
              <div className="mx-auto h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:vibrant-gradient-sky group-hover:text-white transition-all duration-500">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4h-2V2h-4v2H8C5.79 4 4 5.79 4 8v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-1 10H9v-2h6v2zm0-4H9V8h6v2z" /></svg>
              </div>
              <div className="text-lg font-black tracking-tighter">98%</div>
              <div>Satisfaction</div>
            </div>

            <div className="space-y-4 group animate-fade-in-up delay-[400ms]">
              <div className="mx-auto h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:vibrant-gradient-sky group-hover:text-white transition-all duration-500">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              </div>
              <div className="text-lg font-black tracking-tighter text-amber-600 group-hover:text-white">4.8</div>
              <div>Avg Rating</div>
            </div>

            <div className="space-y-4 group animate-fade-in-up delay-[500ms]">
              <div className="mx-auto h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:vibrant-gradient-sky group-hover:text-white transition-all duration-500">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <div className="text-lg font-black tracking-tighter">24/7</div>
              <div>Support</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}