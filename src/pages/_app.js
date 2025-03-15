import NavBar from "../components/Navbar";  
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => (
    <>
      <NavBar />
      {page}
    </>
  ));

  return getLayout(<Component {...pageProps} />);
}
