"use client";

import { useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  location: string;
  type: "photo" | "video" | "reel";
  thumbnailQuery: string;
};

const galleryItems: GalleryItem[] = [
  // Photos
  {
    id: 1,
    title: "Sunset at Baga Beach",
    location: "Goa, India",
    type: "photo",
    thumbnailQuery: "goa,beach,sunset",
  },
  {
    id: 2,
    title: "Tea Gardens of Munnar",
    location: "Kerala, India",
    type: "photo",
    thumbnailQuery: "munnar,tea,gardens",
  },
  {
    id: 3,
    title: "Snowy Mountain View",
    location: "Himachal Pradesh",
    type: "photo",
    thumbnailQuery: "himachal,mountains,snow",
  },
  // Videos
  {
    id: 4,
    title: "Houseboat Ride Highlights",
    location: "Alleppey, Kerala",
    type: "video",
    thumbnailQuery: "kerala,backwaters,boat",
  },
  {
    id: 5,
    title: "Desert Safari Moments",
    location: "Jaisalmer, Rajasthan",
    type: "video",
    thumbnailQuery: "rajasthan,desert,camels",
  },
  // Reels / Shorts
  {
    id: 6,
    title: "90 Seconds in Shillong",
    location: "Meghalaya, India",
    type: "reel",
    thumbnailQuery: "shillong,hills,waterfalls",
  },
  {
    id: 7,
    title: "Andaman Snorkeling Snaps",
    location: "Andaman Islands",
    type: "reel",
    thumbnailQuery: "andaman,sea,coral",
  },
];

const TABS = [
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "reel", label: "Reels / Shorts" },
] as const;

export default function GalleryPage() {
  const [activeType, setActiveType] = useState<"photo" | "video" | "reel">(
    "photo"
  );

  const filteredItems = galleryItems.filter(
    (item) => item.type === activeType
  );

  return (
    <main className="space-y-6 pb-10">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Trip Gallery
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          A glimpse of experiences across India — photos, trip highlight videos,
          and reel-style short clips. Later, we’ll plug this into real media
          uploaded from the admin app.
        </p>
      </section>

      {/* Tabs */}
      <section className="flex flex-wrap gap-2 border-b pb-2">
        {TABS.map((tab) => {
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveType(tab.id as "photo" | "video" | "reel")
              }
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                isActive
                  ? "bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* Grid */}
      <section className="space-y-3">
        <p className="text-xs text-slate-500">
          Showing{" "}
          {activeType === "photo"
            ? "photos"
            : activeType === "video"
            ? "trip videos"
            : "short vertical clips"}{" "}
          (dummy content for now).
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const imgUrl = `https://picsum.photos/seed/${encodeURIComponent(
              item.thumbnailQuery
            )}/800/600`;

            const isVideo = item.type === "video";
            const isReel = item.type === "reel";

            return (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <img
                    src={imgUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay type chip */}
                  <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                    {isVideo ? "Video" : isReel ? "Reel / Short" : "Photo"}
                  </div>

                  {/* Play / Reel icon hint */}
                  {(isVideo || isReel) && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white text-xs">
                        {isVideo ? "▶" : "▶︎"}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-3 py-3 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">{item.location}</p>
                  <p className="text-[11px] text-slate-400">
                    Sample media item. Later this will link to full image/video
                    or lightbox view.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-[11px] text-slate-400">
        Images are currently using a placeholder provider (Picsum) with keyword
        seeds. Once the admin app is ready, this gallery will display actual
        uploaded media from Purbodoy trips.
      </p>
    </main>
  );
}
