import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getAllUsers } from "@/services/user";
import { getAllVenues } from "@/services/venue";
import { getAllReservations } from "@/services/reservation";
import StatisticsCard from "@/components/StatisticsCard";
import DashboardReservationTable from "@/components/DashboardReservationTable";
import DashboardTeamTable from "@/components/DashboardTeamTable";

async function AdminHomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["allVenues"],
    queryFn: getAllVenues,
  });
  await queryClient.prefetchQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  await queryClient.prefetchQuery({
    queryKey: ["allReservations"],
    queryFn: getAllReservations,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatisticsCard />
      <div className="grid gap-4 xl:gap-10 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DashboardReservationTable />
        </div>
        {/* <div>
          <DashboardTeamTable />
        </div> */}
      </div>
    </HydrationBoundary>
  );
}

export default AdminHomePage;
