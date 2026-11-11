"use client";

import Link from "next/link";
import { Calendar, CircleCheck, Clock, Eye, MapPin, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoredBooking } from "@/lib/bookings";

function formatDeparture(value: string): string {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusStyles = {
  Confirmed: {
    badge: "bg-green-100 text-green-700",
    icon: CircleCheck,
  },
  Pending: {
    badge: "bg-amber-100 text-amber-700",
    icon: Clock,
  },
} as const;

const BookingItem = ({
  booking,
  onCancel,
}: {
  booking: StoredBooking;
  onCancel: (destinationId: string) => void;
}) => {
  const status = statusStyles[booking.status];
  const StatusIcon = status.icon;

  return (
    <li className="flex flex-col gap-4 border border-zinc-200 bg-white p-4 sm:flex-row">
      <img
        src={booking.image}
        alt={booking.name}
        className="h-40 w-full shrink-0 rounded-md object-cover sm:w-56"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.badge}`}
        >
          <StatusIcon className="size-3.5" />
          {booking.status}
        </span>

        <h3 className="mt-2 truncate text-2xl font-semibold text-zinc-900">
          {booking.name}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-600">
          <Calendar className="size-4 shrink-0 text-zinc-500" />
          Departure: {formatDeparture(booking.departureDate)}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-600">
          <MapPin className="size-4 shrink-0 text-zinc-500" />
          Booking ID: {booking.bookingId || booking.destinationId}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <p className="text-3xl font-semibold text-brand">
            ${booking.price}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking.destinationId)}
              className="h-9 gap-1.5 rounded-md border-red-300 px-4 text-xs text-red-600 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="size-3.5" />
              Cancel
            </Button>
            <Button
              size="sm"
              render={<Link href={`/destinations/${booking.destinationId}`} />}
              className="h-9 gap-1.5 rounded-md bg-brand px-4 text-xs text-white hover:bg-brand/90"
            >
              <Eye className="size-3.5" />
              View
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default BookingItem;
