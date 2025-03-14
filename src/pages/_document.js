import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Task Displayer</title> {/* ✅ This works */}
        <meta name="description" content="My Task Displayer App" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
