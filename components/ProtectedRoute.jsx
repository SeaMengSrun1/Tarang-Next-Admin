"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
  const router = useRouter();

  useEffect(() => {
    if (data?.status === 401 || data?.data.is_admin === 0) {
      router.push("/login");
    }
  }, [data, router]);

  if (isLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
