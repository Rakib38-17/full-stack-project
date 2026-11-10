"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  Check,
  MapPin,
  Star,


} from "lucide-react";
import {
  type Destination,
  type DestinationFetchResult,
} from "@/lib/destination";
import { Skeleton } from "@/components/ui/skeleton";
import EditDestinationPage from "./EditDestinationPage";
import DeleteDestinationPage from "./deleteDestinationPage";
import BookingCard from "../booking/bookingCard";



const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];



export function DestinationDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white px-8 pb-16">
      <div className="flex items-center justify-between pt-6">
        <Skeleton className="h-4 w-44" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <Skeleton className="mt-5 aspect-[2.45] w-full rounded-sm" />

      <div className="mt-8 flex flex-col gap-10 md:flex-row">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-9 w-72" />
          <Skeleton className="mt-3 h-4 w-96 max-w-full" />
          <Skeleton className="mt-7 h-6 w-36" />
          <Skeleton className="mt-2 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-full max-w-lg" />
          <Skeleton className="mt-7 h-6 w-32" />
          <Skeleton className="mt-2 h-4 w-full max-w-xl" />
          <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full max-w-64" />
            ))}
          </div>
        </div>

        <aside className="w-full shrink-0 space-y-3 border border-zinc-200 bg-white p-5 md:w-60">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
        </aside>
      </div>
    </div>
  );
}

function useResult(destinationPromise: Promise<DestinationFetchResult>) {
  return use(destinationPromise);
}

export function DestinationDetail({
  destinationPromise,
}: {
  destinationPromise: Promise<DestinationFetchResult>;
}) {
  const result = useResult(destinationPromise);
  const router = useRouter();
  const destination: Destination | null =
    "destination" in result ? result.destination : null;
  const [departureDate, setDepartureDate] = useState(
    () => destination?.departureDate ?? "",
  );

  return (
    <div className="min-h-screen bg-white px-8 pb-16">
      <div className="flex items-center justify-between pt-6">
        <Link
          href="/destinations"
          className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900"
        >
          <ChevronLeft className="size-4" />
          Back to Destinations
        </Link>
        <div className="flex items-center gap-2">
           {destination && <EditDestinationPage destination={destination} />}
           {destination && <DeleteDestinationPage id={destination.id} />}
         
        </div>
      </div>

      {"notFound" in result && result.notFound && (
        <div className="mt-16 flex flex-col items-start gap-3">
          <p className="text-sm text-zinc-500">
            No destination found for this link. It may have been removed.
          </p>
          <Link
            href="/destinations"
            className="rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white uppercase hover:bg-brand/90"
          >
            Explore all destinations
          </Link>
        </div>
      )}

      {"error" in result && result.error && (
        <div className="mt-16 flex flex-col items-start gap-3">
          <p className="text-sm text-destructive">
            Could not load this destination. Make sure the API is running, then
            try again.
          </p>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white uppercase hover:bg-brand/90"
          >
            Retry
          </button>
        </div>
      )}

      {destination && (
        <>
          <Image
            src={destination.image}
            alt={destination.name}
            width={1300}
            height={530}
            sizes="(max-width: 768px) 100vw, 85vw"
            priority
            className="mt-5 aspect-[2.45] w-full rounded-sm object-cover"
          />

          <div className="mt-8 flex flex-col gap-10 md:flex-row">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                <MapPin className="size-3.5" />
                <span className="capitalize">{destination.country}</span>
              </p>
              <h1 className="mt-1.5 text-4xl font-normal text-zinc-900">
                {destination.name}
              </h1>
              <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="flex items-center gap-1.5 text-zinc-800">
                  <Star className="size-3.5 fill-current text-brand" />
                  <span className="font-semibold">4.9</span>
                </span>
                <span className="text-zinc-500">(234 reviews)</span>
                <span className="flex items-center gap-1.5 text-zinc-800">
                  <CalendarDays className="size-3.5 text-zinc-500" />
                  {destination.duration.replace("/", " / ")}
                </span>
              </p>

              <h2 className="mt-7 text-xl font-medium text-zinc-900">Overview</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {destination.description}
              </p>

              <h2 className="mt-7 text-xl font-medium text-zinc-900">Highlights</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {destination.description}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <p
                    key={highlight}
                    className="flex items-center gap-2 text-sm text-zinc-700"
                  >
                    <Check className="size-3.5 shrink-0 text-brand" />
                    {highlight}
                  </p>
                ))}
              </div>
            </div>

            <BookingCard destination={destination} />
          </div>
        </>
      )}
    </div>
  );
}
