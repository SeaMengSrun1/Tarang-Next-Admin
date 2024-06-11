"use client";

import { useQuery } from "@tanstack/react-query";
import { LandPlot, Users, Bookmark, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsers } from "@/services/user";
import {
  getReservationReport,
  getVenueReport,
  getPendingReservation,
} from "@/services/report";
import Spinner from "./Spinner";

function StatisticsCard() {
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  const { data: reservationReport, isLoading: reservationsLoading } = useQuery({
    queryKey: ["reportReservation"],
    queryFn: getReservationReport,
  });
  const { data: venueReport, isLoading: venuesLoading } = useQuery({
    queryKey: ["venueReservation"],
    queryFn: getVenueReport,
  });
  const {
    data: pendingReservationReport,
    isLoading: pendingReservationLoading,
  } = useQuery({
    queryKey: ["pendingReservation"],
    queryFn: getPendingReservation,
  });
  return (
    <div className="grid gap-4 xl:gap-10 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white rounded-xl">
        {venuesLoading ? (
          <div className="h-full flex justify-center items-center p-6">
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
              <div className="text-2xl font-bold">{venueReport.data.count}</div>
            </CardContent>
          </>
        )}
      </Card>
      <Card className="bg-white rounded-xl">
        {usersLoading ? (
          <div className="h-full flex justify-center items-center p-6">
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
          <div className="h-full flex justify-center items-center p-6">
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
              <div className="text-2xl font-bold">
                {reservationReport.data.count}
              </div>
            </CardContent>
          </>
        )}
      </Card>
      <Card className="bg-white rounded-xl">
        {pendingReservationLoading ? (
          <div className="h-full flex justify-center items-center p-6">
            <Spinner />
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pending Reservations
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pendingReservationReport.data.length}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

export default StatisticsCard;
