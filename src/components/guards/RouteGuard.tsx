/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { User } from "@/types";
import { createContext, useContext } from "react";

const PUBLIC_PATHS = ["/api/auth/login", "/landing", "/pricing", "/"];

// Create a context to share subscription data across components
export const SubscriptionContext = createContext<{
  hasAccess: (feature: string) => boolean;
  subscriptionTier: string | null;
  isLoading: boolean;
}>({
  hasAccess: () => false,
  subscriptionTier: null,
  isLoading: true,
});

// Hook to use subscription context
export function useSubscription() {
  return useContext(SubscriptionContext);
}

// Define feature access by subscription tier
const SUBSCRIPTION_FEATURES = {
  basic: [
    "basic_dashboard",
    "limited_reports",
    "data_export",
    "basic_analytics",
  ],
  pro: [
    "basic_dashboard",
    "limited_reports",
    "data_export",
    "basic_analytics",
    "advanced_analytics",
    "priority_support",
  ],
  team: [
    "basic_dashboard",
    "limited_reports",
    "data_export",
    "basic_analytics",
    "advanced_analytics",
    "priority_support",
    "custom_integrations",
    "dedicated_support",
  ],
};

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  // Function to check if user has access to a specific feature
  const hasAccess = (feature: string): boolean => {
    if (!subscriptionTier) return false;
    return (
      SUBSCRIPTION_FEATURES[
        subscriptionTier as keyof typeof SUBSCRIPTION_FEATURES
      ]?.includes(feature) || false
    );
  };

  useEffect(() => {
    async function checkAccess() {
      try {
        // Check if current path is public
        const isPublicPath = PUBLIC_PATHS.some((path) =>
          router.pathname.startsWith(path)
        );

        if (!user && !isPublicPath) {
          router.push("/landing");
          return;
        }

        // Check subscription status for protected routes
        if (user) {
          const response = await fetch(`/api/users/${user.sub}`);
          const { data, success } = await response.json();
          if (!success) {
            router.push("/landing");
            return;
          }

          const userData = data as User;
          const subscription = userData.subscription;
          const hasActiveSubscription = subscription?.status === "active";

          if (!hasActiveSubscription && !isPublicPath) {
            router.push("/pricing");
            return;
          }
          console.log(subscription);
          // Set the subscription tier based on user data
          setSubscriptionTier(
            subscription?.product_name === "Clind - Basic Plan"
              ? "basic"
              : subscription?.product_name === "Clind - Premium Plan"
              ? "premium"
              : subscription?.product_name === "Clind - Enterprise Plan"
              ? "enterprise"
              : "free"
          );
        }
      } catch (error) {
        console.error("Error checking access:", error);
        router.push("/landing");
      } finally {
        setIsLoading(false);
      }
    }

    checkAccess();
  }, [user, router.pathname]);

  // Provide subscription context to all child components
  return (
    <SubscriptionContext.Provider
      value={{ hasAccess, subscriptionTier, isLoading }}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </SubscriptionContext.Provider>
  );
}
