import { Html, Head, Main, NextScript } from "next/document";
import { getSession } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "@/lib/mongodb";

export default function Document({ theme }) {
  return (
    <Html lang="en" data-theme={theme}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
