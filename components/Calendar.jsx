"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllReservations } from "@/services/reservation";
import { getAllVenues } from "@/services/venue";
import { getSportTypes } from "@/services/sport";
import ReservationCreateDialog from "./ReservationCreateDialog";
import ReservationCard from "./ReservationCard";
import Spinner from "./Spinner";

function Calendar() {
  const { data: reservations, isLoading: reservationsLoading } = useQuery({
    queryKey: ["allReservations"],
    queryFn: getAllReservations,
  });
  const { data: venues, isLoading: venuesLoading } = useQuery({
    queryKey: ["allVenues"],
    queryFn: getAllVenues,
  });
  const { data: sportTypes, isLoading: sportTypesLoading } = useQuery({
    queryKey: ["allSportTypes"],
    queryFn: getSportTypes,
  });
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }, []);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankDaysArray = [];
    const daysArray = [];

    for (let i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };
  const [filter, setFilter] = useState("");
  return (
    <Card className="antialiased sans-serif">
      {reservationsLoading || venuesLoading || sportTypesLoading ? (
        <div className="flex justify-center items-center p-12">
          <Spinner />
        </div>
      ) : (
        <>
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="flex items-center justify-between py-2 px-6">
                <div>
                  <span className="text-lg font-bold text-gray-800">
                    {MONTH_NAMES[month]}
                  </span>
                  <span className="ml-1 text-lg text-gray-600 font-normal">
                    {year}
                  </span>
                </div>
                <div
                  className="border rounded-lg px-1"
                  style={{ paddingTop: "2px" }}
                >
                  <button
                    type="button"
                    className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center ${
                      month === 0 ? "cursor-not-allowed opacity-25" : ""
                    }`}
                    disabled={month === 0}
                    onClick={() => {
                      setMonth(month - 1);
                      getNoOfDays();
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="border-r inline-flex h-6"></div>
                  <button
                    type="button"
                    className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ${
                      month === 11 ? "cursor-not-allowed opacity-25" : ""
                    }`}
                    disabled={month === 11}
                    onClick={() => {
                      setMonth(month + 1);
                      getNoOfDays();
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap">
                  {DAYS.map((day, index) => (
                    <div
                      key={index}
                      style={{ width: "14.26%" }}
                      className="px-2 py-2"
                    >
                      <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="-mx-1 -mb-1">
                <div className="flex flex-wrap border-t border-l">
                  {blankDays.map((blankday, index) => (
                    <div
                      key={index}
                      style={{ width: "14.28%", height: "120px" }}
                      className="text-center border-r border-b px-4 pt-2"
                    ></div>
                  ))}
                  {noOfDays.map((date, dateIndex) => (
                    <div
                      key={dateIndex}
                      style={{ width: "14.28%", height: "120px" }}
                      className="px-4 pt-2 border-r border-b relative"
                    >
                      {new Date().setHours(0, 0, 0, 0) >
                      new Date(year, month, date) ? (
                        <>{date}</>
                      ) : (
                        <>
                          <ReservationCreateDialog
                            venues={venues}
                            date={new Date(year, month, date)}
                            triggerContent={
                              <div
                                className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                                  isToday(date)
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-200"
                                }`}
                              >
                                {date}
                              </div>
                            }
                          />
                        </>
                      )}
                      <div style={{ height: "80px" }} className=" mt-1">
                        <Sheet>
                          <SheetTrigger className="h-full w-full">
                            {reservations.filter(
                              (reservation) =>
                                new Date(reservation.date).toDateString() ===
                                new Date(year, month, date).toDateString()
                            ).length > 0 && (
                              <>
                                {
                                  reservations.filter(
                                    (reservation) =>
                                      new Date(
                                        reservation.date
                                      ).toDateString() ===
                                      new Date(year, month, date).toDateString()
                                  ).length
                                }{" "}
                                Reservation
                              </>
                            )}
                          </SheetTrigger>
                          <SheetContent className="flex flex-col gap-4 max-w-[400px] sm:max-w-[540px]">
                            <SheetHeader>
                              <div className="flex justify-between items-center">
                                <SheetTitle>Reservations</SheetTitle>
                                <Select onValueChange={(id) => setFilter(id)}>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="View by type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {sportTypesLoading ? (
                                      <div className="flex justify-center py-4">
                                        <Spinner />
                                      </div>
                                    ) : (
                                      <>
                                        {sportTypes.sport_types.map((sport) => (
                                          <SelectItem
                                            key={sport.id}
                                            id={sport.id}
                                            value={sport.id.toString()}
                                          >
                                            {sport.name}
                                          </SelectItem>
                                        ))}
                                      </>
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </SheetHeader>
                            {filter === "" ? (
                              <>
                                {reservations.filter(
                                  (reservation) =>
                                    new Date(
                                      reservation.date
                                    ).toDateString() ===
                                    new Date(year, month, date).toDateString()
                                ).length === 0 ? (
                                  <div className="h-full flex justify-center items-center gap-4">
                                    <Image
                                      src="/favicon.ico"
                                      width={32}
                                      height={32}
                                      alt="tarang_icon"
                                    />
                                    <h1 className="text-2xl font-semibold">
                                      No Reservations
                                    </h1>
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-6 overflow-y-auto h-full">
                                    {reservations
                                      .filter(
                                        (reservation) =>
                                          new Date(
                                            reservation.date
                                          ).toDateString() ===
                                          new Date(
                                            year,
                                            month,
                                            date
                                          ).toDateString()
                                      )
                                      .map((reservation, index) => (
                                        <ReservationCard
                                          key={index}
                                          reservation={reservation}
                                        />
                                      ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {reservations.filter(
                                  (reservation) =>
                                    new Date(
                                      reservation.date
                                    ).toDateString() ===
                                      new Date(
                                        year,
                                        month,
                                        date
                                      ).toDateString() &&
                                    reservation.sport_type.id ===
                                      parseInt(filter)
                                ).length === 0 ? (
                                  <div className="h-full flex justify-center items-center gap-4">
                                    <Image
                                      src="/favicon.ico"
                                      width={32}
                                      height={32}
                                      alt="tarang_icon"
                                    />
                                    <h1 className="text-2xl font-semibold">
                                      No Reservations
                                    </h1>
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-6 overflow-y-auto h-full">
                                    {reservations
                                      .filter(
                                        (reservation) =>
                                          new Date(
                                            reservation.date
                                          ).toDateString() ===
                                            new Date(
                                              year,
                                              month,
                                              date
                                            ).toDateString() &&
                                          reservation.sport_type.id ===
                                            parseInt(filter)
                                      )
                                      .map((reservation, index) => (
                                        <ReservationCard
                                          key={index}
                                          reservation={reservation}
                                        />
                                      ))}
                                  </div>
                                )}
                              </>
                            )}
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default Calendar;
