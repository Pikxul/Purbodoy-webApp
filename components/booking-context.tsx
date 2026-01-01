"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type BookingItem = {
  id: string;
  title: string;
  location: string;
  members: number;
  pricePerHead: number;
};

type Booking = {
  id: string;
  items: BookingItem[];
  total: number;
  createdAt: string;
};

type BookingContextType = {
  lastBooking: Booking | null;
  createBooking: (items: BookingItem[], total: number) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  const createBooking = (items: BookingItem[], total: number) => {
    const booking: Booking = {
      id: `BK-${Date.now()}`,
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    setLastBooking(booking);
  };

  return (
    <BookingContext.Provider value={{ lastBooking, createBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
