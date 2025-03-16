import { useRouter } from "next/router";
import NavBar from "../components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarRoutes = ["/main/login"]; // Hide Navbar on login page

  return (
  <div className="flex flex-col gap-10 w-screen">
    {!hideNavbarRoutes.includes(router.pathname) && <NavBar />}
    <main className="flex-1">
      <Component {...pageProps} />
    </main>
  </div>
  );
}
