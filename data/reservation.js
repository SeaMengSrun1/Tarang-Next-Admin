import { useQuery } from "@tanstack/react-query";
import { getAllReservations } from "@/services/reservation";

export const useGetAllReservations = () => {
  return useQuery({
    queryFn: async () => getAllReservations(),
    queryKey: ["allReservations"],
  });
};
