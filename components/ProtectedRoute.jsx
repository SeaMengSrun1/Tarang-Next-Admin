"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });
  const router = useRouter();
  if (isLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }

  if (data?.status === 401) {
    router.push("/login");
  }

  if (data?.data.is_admin === 0) {
    router.push("/login");
  }

  return <>{children}</>;
}

export default ProtectedRoute;
