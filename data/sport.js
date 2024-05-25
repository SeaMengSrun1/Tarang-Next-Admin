import { useQuery } from "@tanstack/react-query";
import { getSportTypes } from "@/services/sport";

export function useGetSportTypes() {
  return useQuery({
    queryFn: async () => getSportTypes(),
    queryKey: ["sportTypes"],
  });
}
