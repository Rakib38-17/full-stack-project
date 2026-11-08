import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchDestinationsList } from "@/lib/destination";
import {
  DestinationBrowsing,
  DestinationBrowsingSkeleton,
} from "@/components/destination/destinations";

export const metadata: Metadata = {
  title: "Destinations | Wanderlast",
  description: "Explore all travel destinations offered by Wanderlast.",
};

export default function DestinationsPage() {
  return (
    <Suspense fallback={<DestinationBrowsingSkeleton />}>
      <DestinationBrowsing destinationsPromise={fetchDestinationsList()} />
    </Suspense>
  );
}
