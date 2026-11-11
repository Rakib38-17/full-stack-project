// Client-side booking registry. The API only exposes POST /add-booking —
// there is no endpoint to list bookings — so booked trips are tracked per
// logged-in user in localStorage as full snapshots.

export type BookingStatus = "Confirmed" | "Pending";

export type StoredBooking = {
  destinationId: string;
  /** MongoDB _id returned by the API's insertedId. */
  bookingId: string;
  name: string;
  country: string;
  price: number;
  image: string;
  departureDate: string;
  dateBooked: string;
  status: BookingStatus;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function storageKey(userEmail: string) {
  return `wanderlast:booked:${userEmail.toLowerCase()}`;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function getStoredBookings(userEmail: string): StoredBooking[] {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(storageKey(userEmail)) ?? "[]",
    );
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecord).map((item) => ({
      destinationId: asString(item.destinationId, ""),
      bookingId: asString(item.bookingId, ""),
      name: asString(item.name, "Unnamed destination"),
      country: asString(item.country, ""),
      price: typeof item.price === "number" ? item.price : 0,
      image: asString(item.image, "/image/CTA.png"),
      departureDate: asString(item.departureDate, ""),
      dateBooked: asString(item.dateBooked, ""),
      status: item.status === "Pending" ? ("Pending" as const) : ("Confirmed" as const),
    }));
  } catch {
    return [];
  }
}

export function isDestinationBooked(
  userEmail: string,
  destinationId: string,
): boolean {
  return getStoredBookings(userEmail).some(
    (booking) => booking.destinationId === destinationId,
  );
}

export function rememberBooking(userEmail: string, booking: StoredBooking) {
  const bookings = getStoredBookings(userEmail);
  if (bookings.some((item) => item.destinationId === booking.destinationId)) {
    return;
  }
  try {
    window.localStorage.setItem(
      storageKey(userEmail),
      JSON.stringify([...bookings, booking]),
    );
  } catch {
    // Storage unavailable: the booking still went through on the server.
  }
}

/** Removes a booking and returns the remaining list. */
export function removeStoredBooking(
  userEmail: string,
  destinationId: string,
): StoredBooking[] {
  const remaining = getStoredBookings(userEmail).filter(
    (booking) => booking.destinationId !== destinationId,
  );
  try {
    window.localStorage.setItem(storageKey(userEmail), JSON.stringify(remaining));
  } catch {
    // Ignore storage failures.
  }
  return remaining;
}
