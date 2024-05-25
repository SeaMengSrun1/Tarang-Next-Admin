import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
  import { getAllReservations } from "@/services/reservation";
  import { getAllVenues } from "@/services/venue";
  import Calendar from "@/components/Calendar";
  import ReservationTable from "@/components/ReservationTable";
  
  async function ReservationPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ["allVenues"],
      queryFn: getAllVenues,
    });
    await queryClient.prefetchQuery({
      queryKey: ["allReservations"],
      queryFn: getAllReservations,
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Calendar />
        <ReservationTable />
      </HydrationBoundary>
    );
  }
  
  export default ReservationPage;
  