import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { capitalize } from "@/utils/functions";
import { getSession } from "@auth0/nextjs-auth0";

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
  //   "valentine",
  //   "corporate",
  //   "retro",
  //   "pastel",
  //   "black",
  //   "luxury",
];

export default function UserSettings({ initialTheme }) {
  const { user, error, isLoading } = useUser();
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    router.push("/api/auth/login");
    return null;
  }

  if (user.sub !== userId) {
    return <div>You don&#39;t have permission to view this page.</div>;
  }

  const handleThemeChange = async (newTheme) => {
    setCurrentTheme(newTheme);

    try {
      const response = await fetch("/api/user-settings", {
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
      // Optionally, you can add user feedback here
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose the perfect theme!
      </h1>
      <div className="mb-6">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <h3 className="text-xl font-medium mb-2">Light Themes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4 md:mb-0">
              {themes
                .filter(
                  (theme) =>
                    theme !== "forest" &&
                    theme !== "dracula" &&
                    theme !== "synthwave" &&
                    theme !== "business" &&
                    theme !== "night" &&
                    theme !== "coffee"
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
                .filter(
                  (theme) =>
                    theme === "forest" ||
                    theme === "dracula" ||
                    theme === "synthwave" ||
                    theme === "business" ||
                    theme === "night" ||
                    theme === "coffee"
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
      </div>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-settings`,
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  );
  if (!response.ok) {
    console.error("Failed to fetch user settings");
    return { props: { initialTheme: "emerald" } };
  }
  const userSettings = await response.json();

  const initialTheme = userSettings.theme || "emerald";

  return {
    props: {
      initialTheme,
    },
  };
}
