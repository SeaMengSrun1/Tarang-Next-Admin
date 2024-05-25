"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getReservationWithPaginationPage } from "@/services/reservation";
import { format } from "date-fns";
import Spinner from "@/components/Spinner";

function DashboardReservationTable() {
  const paginationUrl = "/api/reservation";
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservationsWithPagination", paginationUrl],
    queryFn: () => getReservationWithPaginationPage(paginationUrl),
  });
  console.log(reservations);
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Reservations</CardTitle>
          <CardDescription>Recent Reservations For Tarang.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/admin/reservation">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-[350px]">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent className="h-[350px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="hidden sm:table-cell">Sport</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Venue ID
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.data.data.map((reservation, index) => (
                  <TableRow key={index}>
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell className="font-medium">
                      {reservation.phone}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">
                        {reservation.venue.sportTypes.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {reservation.venue.id}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {reservation.start_time} - {reservation.end_time}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(reservation.date, "PPP")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default DashboardReservationTable;
