import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useEffect } from "react";

function MyApp({ Component, pageProps, initialTheme }) {
  useEffect(() => {
    const setUserTheme = async () => {
      if (typeof window !== "undefined") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-settings`
        );
        if (response.ok) {
          const { theme } = await response.json();
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("theme", theme);
        } else {
          // Fallback to initialTheme if user settings can't be fetched
          document.documentElement.setAttribute("data-theme", "emerald");
          localStorage.setItem("theme", "emerald");
        }
      }
    };

    setUserTheme();
  }, [initialTheme]);
  return (
    <>
      <Head>
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
        <meta property="og:image" content="/og-image-clind.png" />
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  let initialTheme = "emerald";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-settings`,
      {
        headers: context.req.headers,
      }
    );
    if (response.ok) {
      const { theme } = await response.json();
      initialTheme = theme;
    }
  } catch (error) {
    console.error("Error fetching user theme:", error);
  }

  return {
    props: {
      initialTheme,
    },
  };
}

export default MyApp;
