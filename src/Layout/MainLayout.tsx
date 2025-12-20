"use client";

import ReduxProvider from "@src/redux/reduxProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthLayout from "./AuthLayout";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // Move QueryClient to useMemo to prevent recreation on every render
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
    []
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null during SSR to match initial server render
  if (!isMounted) {
    return null;
  }

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <AuthLayout>{children}</AuthLayout>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default MainLayout;
