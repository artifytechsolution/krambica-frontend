"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExamplePage() {
  const router = useRouter();

  useEffect(() => {
    // You can do any logic here before redirect
    console.log("Redirecting to home page...");
    router.push("/home"); // Redirect to home page
  }, [router]);

  return <h1>Redirecting...</h1>;
}
