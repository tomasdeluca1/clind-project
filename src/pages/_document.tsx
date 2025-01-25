import { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html lang="en" data-theme="emerald">
      <Head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="c6d29b68-5d43-4ebf-96cb-74b8ca555a80"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
