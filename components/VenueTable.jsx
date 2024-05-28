"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVenuesWithPagination } from "@/services/venue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "./Spinner";
import VenueCreateDialog from "./VenueCreateDialog";
import VenueEditDialog from "./VenueEditDialog";
import VenueDeleteDialog from "./VenueDeleteDialog";

function VenueTable() {
  const [paginationUrl, setPaginationUrl] = useState("/api/venues");
  const { data: venues, isLoading } = useQuery({
    queryKey: ["venues", paginationUrl],
    queryFn: () => getVenuesWithPagination(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Venues</CardTitle>
            <CardDescription>Manage Venue</CardDescription>
          </div>
          <VenueCreateDialog />
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {venues.data.data.venues.length === 0 ? (
              <div className="flex justify-center items-center gap-4">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Venues</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {venues.data.data.venues.map((venue, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{venue.id}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          width={64}
                          height={64}
                          src={venue.photo}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {venue.name}
                      </TableCell>
                      <TableCell>{venue.sportTypes.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {venue.size}
                      </TableCell>
                      <TableCell>
                        <VenueEditDialog venue={venue} />
                        <VenueDeleteDialog venue={venue} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-5</strong> venues
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  {venues.data.meta.links.map((link, index) => (
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
      )}
    </Card>
  );
}

export default VenueTable;
