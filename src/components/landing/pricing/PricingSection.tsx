import { JSX } from "react";
import PricingCard from "./PricingCard";
import { Clock } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic Plan",
    price: "3",
    yearlyPrice: "30",
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
    buttonText: "Start Basic Plan",
    buttonLink:
      "https://huevsite.lemonsqueezy.com/buy/daa10ae3-d2fc-439b-b682-e523c4e196e4",
  },
  {
    name: "Pro Plan",
    price: "7",
    yearlyPrice: "70",
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
    isPopular: true,
    buttonText: "Try Pro Plan",
    buttonLink:
      "https://huevsite.lemonsqueezy.com/buy/516f5505-333c-499f-98df-6246e4b33a1a",
  },
  {
    name: "Team Plan",
    price: "15",
    yearlyPrice: "150",
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
];

export default function PricingSection(): JSX.Element {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
          Choose the perfect plan to help you achieve mental clarity and boost
          your productivity
        </p>
        <div className="mt-4 text-base-content/70">
          <p>Save 2 months with yearly billing!</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <div className="mt-16 text-center space-y-4">
        <p className="text-base-content/70">
          All plans include a 14-day free trial. No credit card required.
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
