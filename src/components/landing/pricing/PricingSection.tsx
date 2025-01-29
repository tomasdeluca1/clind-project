"use client";

import { JSX, useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { Check, Clock, X } from "lucide-react";
import { PricingPlan } from "@/types/pricing";

export default function PricingSection() {
  const [productsWithAttributes, setProductsWithAttributes] = useState<any>([]);

  useEffect(() => {
    const pricingPlans =
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? [
            {
              name: "Basic Plan",
              price: "1.99",
              yearlyPrice: "19.99",
              description: "Essential features at an affordable price",
              features: [
                { text: "Priority Three Rule method", included: true },
                { text: "Up to 25 tasks daily", included: true },
                { text: "Basic analytics", included: true },
                { text: "Clean, simple UI", included: true },
                { text: "Custom themes", included: true },
                { text: "1-3-5 Rule method", included: false },
                { text: "Advanced analytics", included: false },
                { text: "Team features", included: false },
              ],
              isPopular: true,
              buttonText: "Start Basic Plan",
              buttonLink:
                "https://huevsite.lemonsqueezy.com/buy/daa10ae3-d2fc-439b-b682-e523c4e196e4",
            },
            {
              name: "Pro Plan",
              price: "4.99",
              yearlyPrice: "49.99",
              description: "Enhanced features for daily productivity",
              features: [
                { text: "Basic Plan features", included: true },
                { text: "1-3-5 Rule method", included: true },
                { text: "Unlimited tasks", included: true },
                { text: "Priority reminders", included: true },
                { text: "Weekly productivity summaries", included: true },
                { text: "Team collaboration", included: false },
                { text: "Third-party integrations", included: false },
              ],
              buttonText: "Try Pro Plan",
              buttonLink:
                "https://huevsite.lemonsqueezy.com/buy/516f5505-333c-499f-98df-6246e4b33a1a",
              isDisabled: true,
              comingSoonBadge: true,
            },
            {
              name: "Team Plan",
              price: "19.99",
              yearlyPrice: "199.99",
              description: "Professional tools for maximum productivity",
              features: [
                { text: "Everything in Pro Plan", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Team collaboration", included: true },
                { text: "Third-party integrations", included: true },
                { text: "Priority support", included: true },
                { text: "Productivity coaching tips", included: true },
                { text: "Custom workflows", included: true },
                { text: "API access", included: true },
              ],
              buttonText: "Coming Soon",
              isDisabled: true,
              comingSoonBadge: true,
            },
          ]
        : [
            {
              id: "free",
              name: "Free",
              price: null,
              yearlyPrice: null,
              description: "Perfect for getting started",
              features: [
                { text: "3 Daily Tasks", included: true },
                { text: "Basic Calendar", included: true },
                { text: "Community Support", included: true },
                { text: "Task History", included: false },
                { text: "Priority Support", included: false },
                { text: "Custom Categories", included: false },
              ],
              priceId: "", // No price ID for free plan
            },
            {
              id: "basic",
              name: "Basic",
              price: "0.99",
              yearlyPrice: "9.99",
              description: "For focused individuals",
              features: [
                { text: "Unlimited Daily Tasks", included: true },
                { text: "Advanced Calendar", included: true },
                { text: "Task History", included: true },
                { text: "Custom Categories", included: true },
                { text: "Priority Support", included: false },
                { text: "Team Features", included: false },
              ],
              isPopular: true,
              priceId: "1a6fdf64-360b-4181-b54f-8fe88f945190", // Test Basic plan ID
            },
          ];

    setProductsWithAttributes(pricingPlans);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {productsWithAttributes.map((plan: any) => (
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
