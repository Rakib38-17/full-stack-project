import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex flex-1 flex-col">
      <Image
        src="/image/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center text-white">
        <h1 className="max-w-xl text-6xl leading-[1.15] font-normal text-balance">
          Discover Your Next Adventure
        </h1>
        <p className="mt-5 max-w-lg text-base leading-6">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-9 flex items-center gap-2">
          <button
            type="button"
            className="flex h-12 items-center gap-2.5 bg-brand px-6 text-sm font-semibold tracking-wider text-brand-foreground uppercase hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="h-12 bg-white/20 px-6 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm hover:bg-white/30"
          >
            View Destination
          </button>
        </div>
      </div>

      <form className="relative z-10 flex items-stretch backdrop-blur-md">
        {searchFields.map((field, index) => (
          <label
            key={field.label}
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-0.5 px-6 py-2.5",
              index % 2 === 0 ? "bg-white/30" : "bg-white/15",
              index > 0 && "border-l border-white/25",
            )}
          >
            <span className="text-sm font-semibold text-zinc-900">
              {field.label}
            </span>
            <input
              type="text"
              placeholder={field.placeholder}
              className="w-full bg-transparent text-xs text-zinc-900 outline-none placeholder:text-zinc-700"
            />
          </label>
        ))}
        <button
          type="submit"
          className="w-44 bg-brand px-8 text-base font-semibold text-brand-foreground hover:bg-brand/90"
        >
          Search
        </button>
      </form>
    </section>
  );
}
