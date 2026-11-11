"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getStoredBookings,
  removeStoredBooking,
  type StoredBooking,
} from "@/lib/bookings";
import BookingItem from "@/components/booking/bookingItem";

// Server components can't read localStorage, so the interactive list lives
// here while the page itself stays a server component.
const MyBookingsList = ({ userEmail }: { userEmail: string }) => {
  const [bookings, setBookings] = useState<StoredBooking[] | null>(null);

  // Deferred so React Compiler's set-state-in-effect rule is satisfied.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setBookings(getStoredBookings(userEmail));
    });
    return () => cancelAnimationFrame(frame);
  }, [userEmail]);

  function handleCancel(destinationId: string) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    setBookings(removeStoredBooking(userEmail, destinationId));
  }

  if (bookings === null) return null;

  if (bookings.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-start gap-3 border border-zinc-200 bg-zinc-50 p-6">
        <p className="text-sm text-zinc-700">
          You have no bookings yet. Explore our destinations and book your
          first trip!
        </p>
        <Link
          href="/destinations"
          className="rounded-md bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand/90"
        >
          Browse Destinations
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-8 flex flex-col gap-4">
      {bookings.map((booking) => (
        <BookingItem
          key={booking.bookingId || booking.destinationId}
          booking={booking}
          onCancel={handleCancel}
        />
      ))}
    </ul>
  );
};

export default MyBookingsList;
