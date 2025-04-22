"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to customers page by default
    router.push("/customers");
  }, [router]);
  
  return null;
}
