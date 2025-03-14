export interface ProductConfig {
  id: string;
  name: string;
  price: string;
  yearlyPrice: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  buy_now_url: string;
  isPopular?: boolean;
  isDisabled?: boolean;
  comingSoonBadge?: boolean;
}

export const PRODUCTS: Record<string, ProductConfig> = {
  BASIC: {
    id: "basic",
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
    buy_now_url:
      "https://huevsite.lemonsqueezy.com/buy/89dc50da-6694-40cc-b72c-81051354ef1d",
  },
  PRO: {
    id: "pro",
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
    isDisabled: true,
    comingSoonBadge: true,
    buy_now_url:
      "https://huevsite.lemonsqueezy.com/buy/516f5505-333c-499f-98df-6246e4b33a1a",
  },
  TEAM: {
    id: "team",
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
    isDisabled: true,
    comingSoonBadge: true,
    buy_now_url: "",
  },
};

export const TEST_PRODUCTS: Record<string, ProductConfig> = {
  BASIC: {
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
    buy_now_url:
      "https://huevsite.lemonsqueezy.com/buy/1a6fdf64-360b-4181-b54f-8fe88f945190",
  },
};

export const getProducts = () =>
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ? PRODUCTS : TEST_PRODUCTS;
