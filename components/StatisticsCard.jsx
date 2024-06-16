"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LandPlot, Users, Bookmark, Activity, Search } from "lucide-react";
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

function StatisticsCard() {
  const now = new Date();
  const [date, setDate] = useState({
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(now.getFullYear(), now.getMonth() + 1, 0),
  });
  const [period, setPeriod] = useState({
    from: "",
    to: "",
  });
  const {
    data: reservationReportByPeirod,
    isLoading: reservationReportByPeirodLoading,
  } = useQuery({
    queryKey: ["reservationReportByPeirod", period],
    queryFn: () => getReservationReportByPeirod(date),
  });
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
  const handleStartDateEndDate = async () => {
    setPeriod({
      from: date.from,
      to: date.to,
    });
  };
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
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">
                  {reservationReportByPeirod.data.count}
                </div>
                <div className="flex gap-2">
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
                  <Button
                    variant="outline"
                    className="bg-[#2ad5a5] text-white"
                    onClick={handleStartDateEndDate}
                  >
                    <Search className="w-4 h-4" />
                  </Button>
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
