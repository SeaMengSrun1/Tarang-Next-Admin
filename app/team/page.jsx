import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
  import { getSportTypes } from "@/services/sport";
  import { getTeams } from "@/services/team";
  import TeamTable from "@/components/TeamTable";
  
  async function TeamPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ["sportTypes"],
      queryFn: getSportTypes,
    });
    await queryClient.prefetchQuery({
      queryKey: ["teams"],
      queryFn: getTeams,
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeamTable />
      </HydrationBoundary>
    );
  }
  
  export default TeamPage;
  