import NavBar from "../components/Navbar";  
import Head from 'next/head'
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => (
    <>
      <Head>
        <title>Task Displayer</title>
      </Head>
      <NavBar />
      {page}
    </>
  ));

  return getLayout(<Component {...pageProps} />);
}
