import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types";

export default function SubscriptionCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/${user.sub}`);
        const userData: User = await response.json();

        const isSubscribed =
          userData.subscription?.status === "active" &&
          new Date(userData.subscription.currentPeriodEnd) > new Date();

        if (!isSubscribed && !router.pathname.startsWith("/pricing")) {
          router.push("/pricing");
        } else {
          setHasAccess(true);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkSubscription();
  }, [user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!hasAccess) return null;

  return <>{children}</>;
}
