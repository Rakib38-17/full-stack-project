import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchDestination } from "@/lib/destination";
import {
  DestinationDetail,
  DestinationDetailSkeleton,
} from "@/components/destination/destination-detail";

export const metadata: Metadata = {
  title: "Destination | Wanderlast",
  description: "Travel package details, overview, and booking options.",
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<DestinationDetailSkeleton />}>
      <DestinationDetail destinationPromise={fetchDestination(id)} />
    </Suspense>
  );
}


