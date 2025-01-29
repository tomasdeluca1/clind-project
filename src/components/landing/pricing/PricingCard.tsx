import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function PricingCard({
  name,
  price,
  yearlyPrice,
  description,
  features,
  isPopular,
  isDisabled = false,
  comingSoonBadge = false,
  buy_now_url,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  console.log(buy_now_url);

  const handleCheckout = async () => {
    const url = new URL(buy_now_url);
    url.searchParams.append("user", user?.sub || "guest");
    url.searchParams.append("plan", name);
    window.location.href = url.toString();
  };

  return (
    <motion.div
      className={`min-h-[670px] relative flex flex-col p-4 sm:p-6 md:p-8 bg-base-100 rounded-3xl shadow-xl ${
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
          <span className="px-3 sm:px-4 py-1 bg-primary text-primary-content text-xs sm:text-sm font-semibold rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {comingSoonBadge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-3 sm:px-4 py-1 bg-base-300 text-base-content text-xs sm:text-sm font-semibold rounded-full flex items-center gap-2">
            <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
            Coming Soon
          </span>
        </div>
      )}

      <div className="mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">{name}</h3>
        <p className="text-sm sm:text-base text-base-content/70 mb-4">
          {description}
        </p>
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-baseline gap-1">
            {price ? (
              <div className="group relative">
                <span className="text-3xl sm:text-4xl font-bold transition-transform duration-300 group-hover:scale-110">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-sm sm:text-base text-base-content/70 ml-1">
                  /month
                </span>
              </div>
            ) : (
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {isDisabled ? "Coming Soon" : "Free"}
              </span>
            )}
          </div>

          {yearlyPrice && (
            <div className="relative group cursor-pointer">
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-success transition-all duration-300 animate-pulse">
                  ${Number(yearlyPrice).toFixed(2)}
                </span>
                <span className="text-sm sm:text-base text-base-content/70">
                  /year
                </span>
                <span className="text-xs sm:text-sm font-medium text-secondary">
                  Save ${(Number(price) * 12 - Number(yearlyPrice)).toFixed(2)}
                  /year
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-sm sm:text-base">
        {features.map((feature: any, index: any) => (
          <li
            key={index}
            className={`flex items-start gap-2 sm:gap-3 ${
              feature.included ? "" : "text-base-content/50"
            }`}
          >
            {feature.included ? (
              <Check className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-success" />
            ) : (
              <X className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-error" />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <motion.button
        className={`btn btn-sm sm:btn-md ${
          isPopular ? "btn-primary" : "btn-outline"
        } w-full ${isDisabled ? "btn-disabled" : ""}`}
        onClick={handleCheckout}
        disabled={isLoading || isDisabled}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : isDisabled ? (
          "Coming Soon"
        ) : price ? (
          "Subscribe Now"
        ) : (
          "Get Started"
        )}
      </motion.button>
    </motion.div>
  );
}
