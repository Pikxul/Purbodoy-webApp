"use client";

import { useState, useRef } from "react";

export default function HighlightsSection() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const touchHandled = useRef(false);



  const highlights = [
    {
      title: "India-Only Experts",
      description: "Focused purely on domestic trips across India.",
      reveal: "With 15+ years of experience, we specialize exclusively in Indian tourism, ensuring authentic and culturally rich experiences.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-blue-100",
    },
    {
      title: "Curated Packages",
      description: "Thoughtfully designed itineraries with transparent pricing.",
      reveal: "Each package is crafted by travel experts, combining must-see attractions with hidden gems for unforgettable journeys.",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      iconBg: "bg-green-100",
    },
    {
      title: "Assisted Booking",
      description: "Human support when you need it.",
      reveal: "Our dedicated travel consultants are available to help customize your trip and answer any questions throughout the booking process.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-purple-100",
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs, clear breakdown of all expenses.",
      reveal: "Complete cost transparency with detailed breakdowns. What you see is what you pay - no surprise charges or hidden fees.",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h6m-6-4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      iconBg: "bg-orange-100",
    },
    {
      title: "Local Expertise",
      description: "Authentic experiences with knowledgeable local guides.",
      reveal: "Partnered with local experts who know every hidden gem, cultural nuance, and authentic experience in their region.",
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      iconBg: "bg-teal-100",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance during your journey.",
      reveal: "Emergency support available 24 hours a day, 7 days a week. Our team is always just a call away, wherever you are in India.",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: "bg-red-100",
    },
  ];

  return (
    <section className="space-y-4" onClick={(e) => {
      // Flip back all cards when clicking outside on mobile
      if (flippedCard !== null) {
        setFlippedCard(null);
      }
    }}>
      <h2 className="text-xl font-semibold text-slate-900">
        Why travel with Purbodoy?
      </h2>

      <div className="grid gap-4 md:grid-cols-3" onClick={(e) => e.stopPropagation()}>
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="highlight-card-container cursor-pointer group"
            onTouchStart={() => {
              touchHandled.current = true;
              setFlippedCard(flippedCard === index ? null : index);
            }}
            onClick={() => {
              if (touchHandled.current) {
                touchHandled.current = false;
                return;
              }
              setFlippedCard(flippedCard === index ? null : index);
            }}
            onMouseEnter={() => setFlippedCard(index)}
            onMouseLeave={() => setFlippedCard(null)}
            style={{ perspective: '1000px', touchAction: 'manipulation' }}
          >
            <div
              className={`highlight-card relative w-full h-48 transition-transform duration-700 preserve-3d ${
                flippedCard === index ? 'rotate-y-180' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden rounded-xl border bg-white p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center text-center space-y-3"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className={`highlight-icon p-3 rounded-lg ${highlight.iconBg}`}>
                  {highlight.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {highlight.title}
                </h3>
                <p className="text-xs text-slate-600">
                  {highlight.description}
                </p>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden rounded-xl border bg-white p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center text-center rotate-y-180"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <p className="text-xs text-slate-500">
                  {highlight.reveal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
