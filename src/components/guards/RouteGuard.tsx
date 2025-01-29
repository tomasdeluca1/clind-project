/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { User } from "@/types";

const PUBLIC_PATHS = ["/api/auth/login", "/landing", "/pricing", "/"];

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

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
        if (user && isPublicPath) {
          const response = await fetch(`/api/users/${user.sub}`);
          const { data, success } = await response.json();
          if (!success) {
            router.push("/landing");
            return;
          }

          const userData = data as User;

          const subscription = userData.subscription;

          const hasActiveSubscription = subscription?.status === "active";

          if (!hasActiveSubscription) {
            router.push("/pricing");

            return;
          }
        }
      } catch (error) {
        console.error("Error checking access:", error);
        router.push("/landing");
      } finally {
        setIsLoading(false);
      }
    }

    checkAccess();
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
