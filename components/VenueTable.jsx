"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getVenuesByType,
  getVenuesByAmenity,
  getVenuesWithPagination,
} from "@/services/venue";
import { getAmenities } from "@/services/amenity";
import { getSportTypes } from "@/services/sport";
import { Separator } from "@/components/ui/separator";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "./Spinner";
import VenueCreateDialog from "./VenueCreateDialog";
import VenueEditDialog from "./VenueEditDialog";
import VenueDeleteDialog from "./VenueDeleteDialog";
import { RefreshCcw } from "lucide-react";
import { getVenuesByTypeAndAmenity } from "@/services/venue";

function VenueTable() {
  const [paginationUrl, setPaginationUrl] = useState("/api/venues");
  const [filter, setFilter] = useState({ type: "all", value: "" });
  const [type, setType] = useState("");
  const [amenity, setamenity] = useState("");
  const fetchVenues = async () => {
    // switch (filter.type) {
    //   case "type":
    //     return getVenuesByType(filter.value);
    //   case "amenity":
    //     return getVenuesByAmenity(filter.value);
    //   default:
    //     return getVenuesWithPagination(paginationUrl);
    // }
    if (filter.type === "all") {
      return getVenuesWithPagination(paginationUrl);
    }
    if (type !== "" && amenity !== "") {
      return getVenuesByTypeAndAmenity(type, amenity);
    } else if (type !== "" && amenity === "") {
      return getVenuesByType(type);
    } else if (type === "" && amenity !== "") {
      return getVenuesByAmenity(amenity);
    } else {
      return getVenuesWithPagination(paginationUrl);
    }
  };
  const { data: amenities, isLoading: amenitiesLoading } = useQuery({
    queryKey: ["allAmenities"],
    queryFn: getAmenities,
  });
  const { data: sportTypes, isLoading: sportTypesLoading } = useQuery({
    queryKey: ["allSportTypes"],
    queryFn: getSportTypes,
  });
  const {
    data: venues,
    isLoading,
    refetch: refetchVenues,
  } = useQuery({
    queryKey: ["venues", paginationUrl, type, amenity],
    queryFn: fetchVenues,
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
    setFilter({ type: "all", value: "" });
  };
  const handleFilterChange = (type, value) => {
    setFilter({ type, value });
  };
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    refetchVenues();
  }, [refresh]);
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle>Venues</CardTitle>
              <CardDescription>Manage Venue</CardDescription>
            </div>
            <button onClick={() => setRefresh(!refresh)}>
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4">
            <Select
              onValueChange={(id) => {
                handleFilterChange("type", id);
                setType(id);
              }}
            >
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
            <Select
              onValueChange={(id) => {
                handleFilterChange("amenity", id);
                setamenity(id);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View by amenity" />
              </SelectTrigger>
              <SelectContent>
                {amenitiesLoading ? (
                  <div className="flex justify-center py-4">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {amenities.amenities.map((amenity) => (
                      <SelectItem
                        key={amenity.id}
                        value={amenity.id.toString()}
                      >
                        {amenity.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
            <Separator orientation="vertical" />
            <VenueCreateDialog />
          </div>
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {venues.data.venues.length === 0 ? (
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
                  {venues.data.venues.map((venue, index) => (
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
                      <TableCell>{venue.sport_type.name}</TableCell>
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
                  {venues.meta.links.map((link, index) => (
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
