import Image from "next/image";

const features = [
  {
    icon: "/image/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/image/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/image/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-brand/10 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-5xl font-normal text-zinc-900">
          Why Choose Wanderlust
        </h2>
        <p className="mt-2 text-center text-sm text-brand">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white px-7 py-7 shadow-sm">
              <Image
                src={feature.icon}
                alt=""
                width={30}
                height={30}
                className="size-8"
              />
              <h3 className="mt-5 text-xl font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-[13px] leading-5 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
