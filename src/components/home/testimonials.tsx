import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/image/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/image/person1.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-normal text-zinc-900">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Real experiences from our happy travelers
            </p>
          </div>
           <Carousel>
            <div className="flex shrink-0 gap-3">
            <CarouselPrevious className="static inset-auto size-10 border-zinc-300 text-zinc-500" />
            <CarouselNext className="static inset-auto size-10 border-zinc-300 text-zinc-500" />
          </div>
          </Carousel>
        </div>
        <Carousel className="mt-10">
          <CarouselContent className="-ml-7">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="pl-7 md:basis-1/2">
                <div className="flex h-full items-center gap-6 border border-zinc-200 bg-white px-7 py-7">
                  <div className="flex-1">
                    <p className="text-[15px] leading-6 text-zinc-800">
                      {testimonial.quote}
                    </p>
                    <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand">
                      <span aria-hidden>&mdash;</span> {testimonial.name}
                    </p>
                    <p className="mt-1 pl-6 text-[11px] text-zinc-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={176}
                    height={160}
                    className="h-40 w-44 shrink-0 object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
