import { JSX } from "react";
import PricingSection from "@/components/landing/pricing/PricingSection";

export default function PricingPage(): JSX.Element {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-base-100 to-base-200/70">
      <PricingSection />
    </section>
  );
}
