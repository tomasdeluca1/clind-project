import { motion } from "framer-motion";
import { JSX } from "react";
import { Check, X, Clock } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string | null;
  yearlyPrice: string | null;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  isDisabled?: boolean;
  comingSoonBadge?: boolean;
  buttonLink?: string;
}

export default function PricingCard({
  name,
  price,
  yearlyPrice,
  description,
  features,
  isPopular,
  buttonText = "Get Started",
  isDisabled = false,
  comingSoonBadge = false,
  buttonLink = "https://huevsite.lemonsqueezy.com/buy/daa10ae3-d2fc-439b-b682-e523c4e196e4",
}: PricingCardProps): JSX.Element {
  return (
    <motion.div
      className={`relative flex flex-col p-8 bg-base-100 rounded-3xl shadow-xl ${
        isPopular ? "border-2 border-primary" : ""
      } ${isDisabled ? "opacity-75" : ""}`}
      whileHover={{ y: isDisabled ? 0 : -8 }}
      transition={{ duration: 0.3 }}
    >
      {isDisabled && (
        <div className="absolute inset-0 bg-base-300/30 rounded-3xl backdrop-blur-[3px] z-10" />
      )}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-primary text-primary-content text-sm font-semibold rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {comingSoonBadge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1 bg-base-300 text-base-content text-sm font-semibold rounded-full flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Coming Soon
          </span>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-base-content/70 mb-4">{description}</p>
        <div className="relative">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                {price ? (
                  <div className="group relative">
                    <span className="text-4xl font-bold transition-transform duration-300 group-hover:scale-110">
                      ${price}
                    </span>
                    <span className="text-base-content/70 ml-1">/month</span>
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary text-primary-content text-xs px-2 py-1 rounded-full">
                        Billed Monthly
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Free
                  </span>
                )}
              </div>
            </div>

            {yearlyPrice && (
              <div className="relative group cursor-pointer">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-success transition-all duration-300 animate-pulse">
                    ${yearlyPrice}
                  </span>
                  <span className="text-base-content/70">/year</span>
                  <span className="ml-2 text-sm font-medium text-secondary">
                    Save $
                    {price &&
                      (Number(price) * 12 - Number(yearlyPrice)).toFixed(0)}
                    /year
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 ${
              feature.included ? "" : "text-error"
            }`}
          >
            {feature.included ? (
              <Check className={`w-5 h-5 mt-0.5 text-success`} />
            ) : (
              <X className={`w-5 h-5 mt-0.5 text-error`} />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <motion.a
          href={isDisabled ? undefined : buttonLink}
          className={`btn ${isPopular ? "btn-primary" : "btn-outline"} w-full ${
            isDisabled ? "btn-disabled" : ""
          }`}
          whileHover={{ scale: isDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        >
          {buttonText}
        </motion.a>
      </div>
    </motion.div>
  );
}
