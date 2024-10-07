import { Html, Head, Main, NextScript } from "next/document";

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
