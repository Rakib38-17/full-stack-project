"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { API_URL, Destination } from "@/lib/destination";
import { authClient } from "@/lib/auth-client";
import {
  isDestinationBooked,
  rememberBooking,
  type BookingStatus,
} from "@/lib/bookings";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24-7 customer support",
];

const BookingCard = ({ destination }: { destination: Destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(
    () => destination?.departureDate ?? "",
  );
  const [booking, setBooking] = useState(false);

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedDate = event.currentTarget.departureDate.value;

    if (!user) {
      alert("Please log in to book a destination.");
      return;
    }

    if (isDestinationBooked(user.email, destination.id)) {
      alert("This destination is already booked. You can book each destination only once.");
      return;
    }

    const bookingData = {
      userName: user.name,
      userEmail: user.email,
      ...destination,
      departureDate: selectedDate,
      dateBooked: new Date(),
    };

    setBooking(true);
    try {
      const res = await fetch(`${API_URL}/add-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const insertedId = await getInsertedId(res);
      if (!res.ok || !insertedId) {
        alert("Booking failed. Please try again.");
        return;
      }
      rememberBooking(user.email, {
        destinationId: destination.id,
        bookingId: insertedId,
        name: destination.name,
        country: destination.country,
        price: destination.price,
        image: destination.image,
        departureDate: selectedDate,
        dateBooked: new Date().toISOString(),
        status: "Confirmed" satisfies BookingStatus,
      });
      alert("Booking successful!");
    } catch {
      alert("Booking failed. Please check your connection and try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <aside className="w-full shrink-0 border border-zinc-200 bg-white p-5 md:w-60">
      <p className="text-xs text-zinc-500">Starting from</p>
      <p className="mt-1 text-2xl font-semibold text-brand">
        ${destination.price}
      </p>
      <p className="mt-0.5 text-xs text-zinc-500">per person</p>

      <form onSubmit={handleBooking}>
        <input
          type="date"
          name="departureDate"
          value={departureDate}
          onChange={(event) => setDepartureDate(event.target.value)}
          className="mt-4 h-9 w-full rounded-md border-transparent bg-zinc-50 px-3 text-sm text-zinc-700 outline-none focus:ring-3 focus:ring-ring/50"
        />

        <Button
          type="submit"
          disabled={booking}
          className="mt-4 h-10 w-full gap-1.5 rounded-md bg-brand text-sm text-white hover:bg-brand/90"
        >
          {booking ? "Booking..." : "Book Now"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <ul className="mt-4 space-y-2">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-zinc-700"
          >
            <Check className="size-3 shrink-0 text-brand" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
};

// The API responds to a successful POST with {"acknowledged":true,"insertedId":"..."}.
async function getInsertedId(res: Response): Promise<string> {
  try {
    const data: unknown = await res.json();
    const insertedId =
      typeof data === "object" && data !== null
        ? (data as { insertedId?: unknown }).insertedId
        : undefined;
    return typeof insertedId === "string" ? insertedId : "";
  } catch {
    return "";
  }
}

export default BookingCard;
