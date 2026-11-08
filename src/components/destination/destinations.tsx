"use client";

import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  RotateCcw,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  API_URL,
  type DestinationsFetchResult,
} from "@/lib/destination";

type PriceRange = { label: string; min: number; max?: number };

const triggerClasses =
  "h-12 w-full justify-between rounded-none border-zinc-300 px-4 text-xs uppercase tracking-wide text-zinc-500 hover:bg-zinc-50";

const priceRanges: PriceRange[] = [
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "$2,000 - $3,000", min: 2000, max: 3000 },
  { label: "$3,000+", min: 3000 },
];

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Rating: High to Low",
  "Name: A to Z",
];

export function DestinationBrowsingSkeleton() {
  return (
    <div className="min-h-screen bg-white px-8 pb-20">
      <Skeleton className="mt-10 h-10 w-full max-w-xl" />
      <Skeleton className="mt-4 h-4 w-72" />

      <div className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>

      <Skeleton className="mt-4 h-4 w-40" />

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-1.5">
            <Skeleton className="aspect-[1.85] w-full" />
            <Skeleton className="mt-3 h-4 w-24" />
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="mt-2 h-4 w-28" />
            <Skeleton className="mt-3 h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function useResult(destinationsPromise: Promise<DestinationsFetchResult>) {
  return use(destinationsPromise);
}

export function DestinationBrowsing({
  destinationsPromise,
}: {
  destinationsPromise: Promise<DestinationsFetchResult>;
}) {
  const result = useResult(destinationsPromise);
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // Memoized so useMemo dependency arrays below stay stable.
  const destinations = useMemo(
    () => ("destinations" in result ? result.destinations : []),
    [result],
  );

  const categoryOptions = useMemo(
    () => [...new Set(destinations.map((d) => d.category))].sort(),
    [destinations],
  );

  const filtered = useMemo(() => {
    let list = [...destinations];

    if (category) {
      list = list.filter((d) => d.category === category);
    }

    if (priceRange) {
      const range = priceRanges.find((r) => r.label === priceRange);
      if (range) {
        list = list.filter(
          (d) =>
            d.price >= range.min &&
            (range.max === undefined || d.price < range.max),
        );
      }
    }

    switch (sortBy) {
      case sortOptions[0]:
        list.sort((a, b) => a.price - b.price);
        break;
      case sortOptions[1]:
        list.sort((a, b) => b.price - a.price);
        break;
      case sortOptions[2]:
        list.sort((a, b) => b.rating - a.rating);
        break;
      case sortOptions[3]:
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [destinations, category, priceRange, sortBy]);

  const hasFilters = Boolean(category || priceRange || sortBy);

  function resetFilters() {
    setCategory(null);
    setPriceRange(null);
    setSortBy(null);
  }

  return (
    <div className="min-h-screen bg-white px-8 pb-20">
      <h1 className="pt-10 text-5xl font-normal text-zinc-900">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
        <Select
          value={category}
          onValueChange={(value) => setCategory(value ?? null)}
        >
          <SelectTrigger className={triggerClasses}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(value) => setPriceRange(value ?? null)}
        >
          <SelectTrigger className={triggerClasses}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value ?? null)}>
          <SelectTrigger className={triggerClasses}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {"error" in result && (
        <div className="mt-10 flex flex-col items-start gap-3">
          <p className="text-sm text-destructive">
            Could not load destinations. Make sure the API is running at{" "}
            {API_URL}.
          </p>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white uppercase hover:bg-brand/90"
          >
            <RotateCcw className="size-3.5" />
            Retry
          </button>
        </div>
      )}

      {"destinations" in result && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              Showing {filtered.length} destination
              {filtered.length === 1 ? "" : "s"}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-brand hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((destination) => (
              <article key={destination.id} className="bg-white p-1.5">
                <div className="relative">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={480}
                    height={260}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="aspect-[1.85] w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 flex items-center gap-1 bg-zinc-900/85 px-2 py-1 text-xs text-white">
                    {destination.rating}
                    <Star className="size-3 fill-current" />
                  </span>
                </div>

                <div className="pt-3">
                  <p className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <MapPin className="size-3.5" />
                    {destination.country || "—"}
                  </p>
                  <div className="mt-1.5 flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-zinc-900">
                      {destination.name}
                    </h3>
                    <p className="shrink-0 text-sm font-semibold text-zinc-900">
                      ${destination.price}
                      <span className="text-[10px] font-normal">/Person</span>
                    </p>
                  </div>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-zinc-500">
                    <CalendarDays className="size-3.5" />
                    {destination.duration}
                  </p>
                  <Link
                    href={`/destinations/${destination.id}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium tracking-wide text-brand uppercase hover:underline"
                  >
                    Book Now
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-4 text-sm text-zinc-500">
              No destinations match your filters.
            </p>
          )}
        </>
      )}
    </div>
  );
}
