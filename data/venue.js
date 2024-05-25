import { useQuery } from "@tanstack/react-query";
import { getAllVenues, showSingleVenue } from "@/services/venue";

export const useGetAllVenues = () => {
  return useQuery({
    queryFn: async () => getAllVenues(),
    queryKey: ["allVenues"],
  });
};

export const useGetVenue = (venueId) => {
  return useQuery({
    queryFn: async () => showSingleVenue(venueId),
    queryKey: ["venue", venueId],
  });
};
