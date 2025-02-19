import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeOption } from "@/types";
import { Toaster } from "react-hot-toast";
import RouteGuard from "@/components/guards/RouteGuard";
import { ErrorBoundary } from "react-error-boundary";

interface MyAppProps extends AppProps {
  initialTheme: ThemeOption;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="alert alert-error">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

function MyApp({ Component, pageProps, initialTheme }: MyAppProps) {
  useEffect(() => {
    const setUserTheme = async () => {
      if (typeof window !== "undefined") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user-settings`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                Accept: "application/json",
              },
            }
          );
          if (response.ok) {
            const { theme } = await response.json();
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
          } else {
            document.documentElement.setAttribute("data-theme", "emerald");
            localStorage.setItem("theme", "emerald");
          }
        } catch (error) {
          console.error("Error fetching theme:", error);
          document.documentElement.setAttribute("data-theme", "emerald");
          localStorage.setItem("theme", "emerald");
        }
      }
    };

    setUserTheme();
  }, [initialTheme]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Head>
        {" "}
        <meta charSet="UTF-8" />
        <meta name="title" content="Clind - Clear Tasks, Clean Mind" />
        <meta
          name="description"
          content="Clind: Clear Tasks, Clean Mind. Streamline your thoughts, boost productivity, and achieve peace of mind with our intuitive task management app."
        />
        <meta
          name="keywords"
          content="task management, productivity, mental clarity, brain dump, priority tasks, to-do list, time management, focus, goal setting, personal organization, mindfulness, stress reduction, work-life balance, efficiency, habit formation"
        />
        <meta name="author" content="Clind" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Clind - Clear Tasks, Clean Mind" />
        <meta
          property="og:description"
          content="Declutter your mind and boost productivity with Clind's intuitive task management system. Prioritize, focus, and achieve more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.clind.site" />
        <meta
          property="og:image"
          content="https://www.clind.site/og-image-clind.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clind - Clear Tasks, Clean Mind" />
        <meta
          name="twitter:description"
          content="Streamline your thoughts, boost productivity, and achieve peace of mind with Clind's task management app."
        />
        <meta
          name="twitter:image"
          content="https://www.clind.site/og-image-clind.png"
        />
        <link rel="canonical" href="https://www.clind.site" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" sizes="16x16" href="/miniatura.png" />
        <link rel="icon" sizes="32x32" href="/miniatura.png" />
        <link rel="icon" sizes="48x48" href="/miniatura.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/miniatura.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/miniatura.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/miniatura.png"
        />
      </Head>
      <UserProvider>
        <RouteGuard>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
