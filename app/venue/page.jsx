import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
  // import { getVenues } from "@/services/venue";
  import { getSportTypes } from "@/services/sport";
  import { getAmenities } from "@/services/amenity";
  import VenueTable from "@/components/VenueTable";
  import SportTypeTable from "@/components/SportTypeTable";
  import AmenityTable from "@/components/AmenityTable";
  
  async function VenuePage() {
    const queryClient = new QueryClient();
  
    // await queryClient.prefetchQuery({
    //   queryKey: ["venues"],
    //   queryFn: getVenues,
    // });
    await queryClient.prefetchQuery({
      queryKey: ["sportTypes"],
      queryFn: getSportTypes,
    });
    await queryClient.prefetchQuery({
      queryKey: ["amenities"],
      queryFn: getAmenities,
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VenueTable />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-10">
          <div>
            <SportTypeTable />
          </div>
          <div>
            <AmenityTable />
          </div>
        </div>
      </HydrationBoundary>
    );
  }
  
  export default VenuePage;
  