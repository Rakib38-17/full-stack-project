
import { Banner } from "@/components/home/banner";
import { WhyChoose } from "@/components/home/why-choose";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";


export default function Home() {
  return (
    <>    
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
      
    </>
  );
}