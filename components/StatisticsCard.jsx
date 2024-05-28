"use client";

import { useQuery } from "@tanstack/react-query";
import { LandPlot, Users, Bookmark, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsers } from "@/services/user";
import { getAllVenues } from "@/services/venue";
import { getAllReservations } from "@/services/reservation";
import Spinner from "./Spinner";

function StatisticsCard() {
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  const { data: venues, isLoading: venuesLoading } = useQuery({
    queryKey: ["allVenues"],
    queryFn: getAllVenues,
  });
  const { data: reservations, isLoading: reservationsLoading } = useQuery({
    queryKey: ["allReservations"],
    queryFn: getAllReservations,
  });
  return (
    <div className="grid gap-4 xl:gap-10 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white rounded-xl">
        {venuesLoading ? (
          <div className="h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Venues
              </CardTitle>
              <LandPlot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{venues?.venues.length}</div>
            </CardContent>
          </>
        )}
      </Card>
      <Card className="bg-white rounded-xl">
        {usersLoading ? (
          <div className="h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total User</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users?.length}</div>
            </CardContent>
          </>
        )}
      </Card>
      <Card className="bg-white rounded-xl">
        {reservationsLoading ? (
          <div className="h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reservations
              </CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations?.length}</div>
            </CardContent>
          </>
        )}
      </Card>
      <Card className="bg-white rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Pending Reservations
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatisticsCard;
