import { useQuery } from "@tanstack/react-query";
import { getAmenities } from "@/services/amenity";

export const useGetAmenities = () => {
  return useQuery({
    queryFn: async () => getAmenities(),
    queryKey: ["amenities"],
  });
};
