"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LandPlot, Users, Bookmark, Activity } from "lucide-react";
import { addDays, format, startOfMonth, endOfMonth, formatISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsers } from "@/services/user";
import {
  getReservationReport,
  getVenueReport,
  getPendingReservation,
  getReservationReportByPeirod,
} from "@/services/report";
import Spinner from "./Spinner";

function formatDateToCustomFormat(dateString) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

function StatisticsCard() {
  const now = new Date();
  const [date, setDate] = useState({
    from: formatDateToCustomFormat(formatISO(startOfMonth(now))),
    to: formatDateToCustomFormat(formatISO(endOfMonth(now))),
  });
  console.log(date);
  const {
    data: reservationReportByPeirod,
    isLoading: reservationReportByPeirodLoading,
  } = useQuery({
    queryKey: ["reservationReportByPeirod", date],
    queryFn: () => getReservationReportByPeirod(date),
  });
  console.log(reservationReportByPeirod);
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
  const onChange = (e) => {};
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
      <Card className="bg-white rounded-xl col-span-2">
        {reservationReportByPeirodLoading ? (
          <div className="h-full flex justify-center items-center p-6">
            <Spinner />
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reservation by Period
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">
                  {reservationReportByPeirod.data.count}
                </div>
                <div>
                  <div className={cn("grid gap-2")}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

export default StatisticsCard;
