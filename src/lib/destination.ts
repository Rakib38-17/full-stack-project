// Shared destination helpers/types — safe to import from both server and
// client components (this file must stay free of "use client").

export type Destination = {
  id: string;
  _id?: string;
  name: string;
  country: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  image: string;
  /** Raw image URL as stored in the API ("", when absent). */
  imageUrl?: string;
  departureDate?: string;
  description?: string;
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  // The API returns several numeric fields (e.g. price) as strings.
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

// The API shape isn't pinned down yet, so accept the handful of field
// names commonly used and fall back politely.
export function toDestination(
  item: Record<string, unknown>,
  index: number,
): Destination {
  const rawDuration = asString(item.duration, "").trim();
  const asDays = Number(rawDuration);
  // The API stores duration as total days ("23"); nights = days - 1.
  // Text entered verbatim in the form (e.g. "7 Days/6 Nights") passes through.
  const duration =
    rawDuration !== "" && Number.isFinite(asDays)
      ? asDays > 1
        ? `${asDays} Days/${asDays - 1} Nights`
        : "1 Day"
      : rawDuration || "Multi-day trip";

  return {
    id: asString(item.id, asString(item._id, String(index))),
    name: asString(item.name, asString(item.destinationName, "Unnamed destination")),
    country: asString(item.country, asString(item.location, "")),
    price: asNumber(
      item.price,
      asNumber(item.pricePerPerson, asNumber(item.price_per_person, 0)),
    ),
    duration,
    category: asString(item.category, asString(item.type, "Other")),
    rating: asNumber(item.rating, asNumber(item.ratingValue, 4.5)),
    imageUrl: asString(item.imageUrl, ""),
    departureDate: asString(item.departureDate, ""),
    description: asString(item.description, ""),
    image: asString(
      item.image,
      asString(item.imageUrl, asString(item.image_url, "/image/CTA.png")),
    ),
  };
}

export function normalizeDestinations(raw: unknown): Destination[] {
  const source = Array.isArray(raw)
    ? raw
    : isRecord(raw)
      ? (raw.destinations ?? raw.data ?? raw.items)
      : null;
  return (Array.isArray(source) ? source : [])
    .filter(isRecord)
    .map(toDestination);
}

// Result of GET /destination/:id, resolved (never rejected) so client
// components can consume it with React's use() without an error boundary.
export type DestinationFetchResult =
  | { destination: Destination }
  | { notFound: true }
  | { error: true };

export function fetchDestination(id: string): Promise<DestinationFetchResult> {
  return fetch(`${API_URL}/destination/${id}`)
    .then(async (response) => {
      if (response.status === 404) return { notFound: true } as const;
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      return { destination: toDestination(await response.json(), 0) };
    })
    .catch(() => ({ error: true }) as const);
}

// Result of GET /destinations for the listing page.
export type DestinationsFetchResult =
  | { destinations: Destination[] }
  | { error: true };

export function fetchDestinationsList(): Promise<DestinationsFetchResult> {
  return fetch(`${API_URL}/destinations`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      return { destinations: normalizeDestinations(await response.json()) };
    })
    .catch(() => ({ error: true }) as const);
}
