import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import MyBookingsList from "@/components/booking/myBookingsList";

// The headers() read is dynamic, so it lives inside the Suspense-wrapped
// section (cacheComponents requires dynamic data within a boundary).
async function BookingsSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return (
      <div className="mt-10 flex flex-col items-start gap-3 border border-zinc-200 bg-zinc-50 p-6">
        <p className="text-sm text-zinc-700">
          Please log in to see your bookings.
        </p>
        <Link
          href="/login"
          className="rounded-md bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand/90"
        >
          Log In
        </Link>
      </div>
    );
  }

  return <MyBookingsList userEmail={user.email} />;
}

function MyBookingsSkeleton() {
  return (
    <div className="mt-8 space-y-4" aria-hidden>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="flex animate-pulse gap-4 border border-zinc-200 bg-white p-4"
        >
          <div className="h-40 w-56 shrink-0 rounded-md bg-zinc-100" />
          <div className="flex-1 space-y-3 py-2">
            <div className="h-5 w-24 rounded bg-zinc-100" />
            <div className="h-7 w-52 rounded bg-zinc-100" />
            <div className="h-4 w-44 rounded bg-zinc-100" />
            <div className="h-4 w-40 rounded bg-zinc-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

const MyBookingsPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl bg-white px-4 py-10 md:px-8">
      <h1 className="text-4xl font-bold text-zinc-900">My Bookings</h1>
      <p className="mt-3 text-sm text-zinc-500">
        Manage and view your upcoming travel plans
      </p>

      <Suspense fallback={<MyBookingsSkeleton />}>
        <BookingsSection />
      </Suspense>
    </div>
  );
};

export default MyBookingsPage;
