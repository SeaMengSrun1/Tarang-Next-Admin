import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/team";

export const useGetTeams = () => {
  return useQuery({
    queryFn: async () => getTeams(),
    queryKey: ["teams"],
  });
};
