import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/main/login"); // Redirect to /main/login on page load
  }, []);

  return null; // Empty page since it redirects immediately
}