import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { capitalize } from "@/utils/functions";
import { getSession } from "@auth0/nextjs-auth0";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { CheckCircle, Crown } from "lucide-react";
import { useSubscription } from "@/components/guards/RouteGuard";

const themes = [
  "lofi",
  "emerald",
  "forest",
  "synthwave",
  "garden",
  "dracula",
  "fantasy",
  "cmyk",
  "autumn",
  "business",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

interface UserSubscription {
  status: string;
  currentPeriodEnd: string;
  product_name?: string;
  cancelAtPeriodEnd?: boolean;
}

interface ProfilePageProps {
  initialTheme: string;
}

function ProfilePage({ initialTheme }: ProfilePageProps) {
  const { user, error, isLoading } = useUser();
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const router = useRouter();
  const { userId } = router.query;
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null
  );

  const { subscriptionTier } = useSubscription();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user?.sub) {
        const userData = await fetch(`/api/users/${user.sub}`);
        const data = await userData.json();
        setSubscription(data.data.subscription);
      }
    };
    fetchSubscription();
  }, [user]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    router.push("/api/auth/login");
    return null;
  }

  if (user.sub !== userId) {
    return <div>You don&#39;t have permission to view this page.</div>;
  }

  const handleThemeChange = async (newTheme: string) => {
    setCurrentTheme(newTheme);
    try {
      if (subscriptionTier === "free") {
        return;
      }
      const response = await fetch("/api/user-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: newTheme }),
      });
      if (!response.ok) {
        throw new Error("Failed to update theme in database");
      }
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  const renderSubscriptionStatus = () => {
    if (!subscription) return null;
    const isActive = subscription.status === "active";
    const endDate = subscription.currentPeriodEnd
      ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
      : null;

    return (
      <motion.div
        className="mb-8 p-6 rounded-lg bg-base-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          {isActive ? (
            <Crown className="text-4xl text-warning" />
          ) : (
            <Crown className="text-4xl text-base-content/50" />
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {subscription.product_name || "Free Plan"}
            </h2>
            <p className="text-base-content/70">
              {isActive ? `Active until ${endDate}` : "No active subscription"}
            </p>
          </div>
        </div>

        {isActive && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-success" />
              <span>Unlimited tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-success" />
              <span>Priority support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-success" />
              <span>Advanced features</span>
            </div>

            {subscription.cancelAtPeriodEnd && (
              <div className="mt-4 p-4 bg-base-300 rounded-lg">
                <p className="text-sm">
                  Your subscription will end on {endDate}. You won&apos;t be
                  charged again.
                </p>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={() =>
                  window.open("https://app.lemonsqueezy.com/billing", "_blank")
                }
                className={`btn ${
                  subscription.cancelAtPeriodEnd ? "btn-primary" : "btn-ghost"
                }`}
              >
                {subscription.cancelAtPeriodEnd
                  ? "Reactivate Subscription"
                  : "Manage Subscription"}
              </button>
            </div>
          </div>
        )}

        {!isActive && (
          <div className="mt-4">
            <Link href="/pricing" className="btn btn-primary">
              Upgrade Now
            </Link>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

      {renderSubscriptionStatus()}

      <motion.div
        className="mb-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
        {subscriptionTier === "free" ? (
          <div className="p-4 bg-base-300 rounded-lg">
            <p className="text-sm mb-2">
              Explore our themes, available for Basic and Pro users!
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme}
                  // onClick={() => handleThemeChange(theme)}
                  onMouseEnter={() => handleThemeChange(theme)}
                  onTouchStart={() => handleThemeChange(theme)}
                  className={`group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    currentTheme === theme ? "ring-2 ring-primary" : ""
                  }`}
                  data-theme={theme}
                >
                  <div className="flex flex-col items-start w-full h-full">
                    <div className="flex w-full h-16">
                      <div className="w-1/2 md:w-1/4 h-full bg-primary"></div>
                      <div className="w-1/2 md:w-1/4 h-full bg-secondary"></div>
                      <div className="hidden md:block w-1/4 h-full bg-accent"></div>
                      <div className="hidden md:block w-1/4 h-full bg-neutral"></div>
                    </div>
                    <span className="text-base-content p-2 text-sm font-medium">
                      {capitalize(theme)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-base-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {currentTheme === theme && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-content rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="md:flex md:space-x-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-medium mb-2">Light Themes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4 md:mb-0">
                {themes
                  .filter(
                    (theme) =>
                      ![
                        "forest",
                        "dracula",
                        "synthwave",
                        "business",
                        "night",
                        "coffee",
                      ].includes(theme)
                  )
                  .map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                        currentTheme === theme ? "ring-2 ring-primary" : ""
                      }`}
                      data-theme={theme}
                    >
                      <div className="flex flex-col items-start w-full h-full">
                        <div className="flex w-full h-16">
                          <div className="w-1/4 h-full bg-primary"></div>
                          <div className="w-1/4 h-full bg-secondary"></div>
                          <div className="w-1/4 h-full bg-accent"></div>
                          <div className="w-1/4 h-full bg-neutral"></div>
                        </div>
                        <span className="text-base-content p-2 text-sm font-medium">
                          {capitalize(theme)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-base-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      {currentTheme === theme && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-content rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-medium mb-2">Dark Themes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {themes
                  .filter((theme) =>
                    [
                      "forest",
                      "dracula",
                      "synthwave",
                      "business",
                      "night",
                      "coffee",
                    ].includes(theme)
                  )
                  .map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                        currentTheme === theme ? "ring-2 ring-primary" : ""
                      }`}
                      data-theme={theme}
                    >
                      <div className="flex flex-col items-start w-full h-full">
                        <div className="flex w-full h-16">
                          <div className="w-1/4 h-full bg-primary"></div>
                          <div className="w-1/4 h-full bg-secondary"></div>
                          <div className="w-1/4 h-full bg-accent"></div>
                          <div className="w-1/4 h-full bg-neutral"></div>
                        </div>
                        <span className="text-base-content p-2 text-sm font-medium">
                          {capitalize(theme)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-base-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      {currentTheme === theme && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-content rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context.req, context.res);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  try {
    const profileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`,
      {
        headers: { Cookie: context.req.headers.cookie },
      }
    );

    const userProfile = await profileResponse.json();

    return {
      props: {
        initialTheme: userProfile.theme || "emerald",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialTheme: "emerald",
      },
    };
  }
}

export default withPageAuthRequired(ProfilePage);
