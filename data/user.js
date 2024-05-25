import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUser } from "@/services/user";

export const useGetUser = () => {
  return useQuery({
    queryFn: async () => getUser(),
    queryKey: ["users"],
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryFn: async () => getAllUsers(),
    queryKey: ["allUsers"],
  });
};
