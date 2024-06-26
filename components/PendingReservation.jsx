"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPendingReservation } from "@/services/report";
import { format } from "date-fns";
import Spinner from "@/components/Spinner";

function PendingReservation() {
  const [paginationUrl, setPaginationUrl] = useState(
    "/api/reservation/pending"
  );
  const {
    data: pendingReservationReport,
    isLoading: pendingReservationLoading,
  } = useQuery({
    queryKey: ["pendingReservation", paginationUrl],
    queryFn: () => getPendingReservation(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  console.log(pendingReservationReport);
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader>
        <CardTitle>Pending Reservations</CardTitle>
        <CardDescription>Upcoming Reservations For Tarang.</CardDescription>
      </CardHeader>
      {/* {pendingReservationLoading ? (
        <div className="flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {pendingReservationReport.data.length === 0 ? (
              <div className="flex justify-center items-center gap-4">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Reservations</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Sport
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Venue ID
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReservationReport.data.map((reservation, index) => (
                    <TableRow key={index}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell className="font-medium">
                        {reservation.phone}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">
                          {reservation.venue.sport_type.name}
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
                      <TableCell>
                        <ReservationEditDialog reservation={reservation} />
                        <ReservationDeleteDialog
                          reservationId={reservation.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-5</strong> reservations
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  {reservations.meta.links.map((link, index) => (
                    <div key={index}>
                      {link.label === "&laquo; Previous" && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              link.url && handlePaginationChange(link.url)
                            }
                          />
                        </PaginationItem>
                      )}
                      {link.label !== "&laquo; Previous" &&
                        link.label !== "Next &raquo;" && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() =>
                                link.url && handlePaginationChange(link.url)
                              }
                              isActive={link.active}
                            >
                              {link.label}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                      {link.label === "Next &raquo;" && (
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              link.url && handlePaginationChange(link.url)
                            }
                          />
                        </PaginationItem>
                      )}
                    </div>
                  ))}
                </PaginationContent>
              </Pagination>
            </div>
          </CardFooter>
        </>
      )} */}
    </Card>
  );
}

export default PendingReservation;
