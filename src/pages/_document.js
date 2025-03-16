import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <title>Task Displayer</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <body>  
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
