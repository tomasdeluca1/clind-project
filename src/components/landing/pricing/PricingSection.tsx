"use client";

import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { Clock } from "lucide-react";
import { ProductConfig, getProducts } from "@/config/products";

export default function PricingSection() {
  const [products, setProducts] = useState<ProductConfig[]>([]);

  useEffect(() => {
    const productConfigs = Object.values(getProducts());
    setProducts(productConfigs);
  }, []);

  return (
    <div className="text-center space-y-8 sm:space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Great pricing, better features.
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include a 7-day
          free trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {products.map((plan) => (
          <div key={plan.name} className="w-full max-w-md mx-auto">
            <PricingCard {...plan} />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center space-y-4">
        <p className="text-base-content/70">
          All plans include a 7-day free trial. No credit card required.
        </p>
        <div className="flex items-center justify-center gap-2 text-primary">
          <Clock className="w-5 h-5" />
          <p className="text-sm font-medium">
            Pro plan features coming soon! Join the waitlist to get notified.
          </p>
        </div>
      </div>
    </div>
  );
}
