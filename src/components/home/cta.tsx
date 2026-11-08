import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="bg-zinc-950 px-6 pt-8 pb-20">
      <div className="relative">
        <Image
          src="/image/CTA.png"
          alt="Airplane flying over a tropical island"
          width={1440}
          height={440}
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
      </div>

      <div className="text-center">
        <h2 className="mt-7 text-4xl leading-[1.15] font-normal text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-brand">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button
          type="button"
          className="mt-10 ml-150 flex h-11 items-center  gap-2.5 bg-white px-6 text-xs font-semibold tracking-wider text-zinc-900 uppercase hover:bg-zinc-200"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
