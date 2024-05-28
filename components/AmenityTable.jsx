"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
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
import { getAmenities } from "@/services/amenity";
import AmenityCreateDialog from "./AmenityCreateDialog";
import AmenityEditDialog from "./AmenityEditDialog";
import AmenityDeleteDialog from "./AmenityDeleteDialog";
import Spinner from "./Spinner";

function AmenityTable() {
  const { data: amenities, isLoading } = useQuery({
    queryKey: ["allAmenities"],
    queryFn: getAmenities,
  });
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>Manage Amenities</CardDescription>
          </div>
          <AmenityCreateDialog />
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {amenities.amenities.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Amenities</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amenities.amenities.map((amenity, index) => (
                    <TableRow key={index}>
                      <TableCell>{amenity.id}</TableCell>
                      <TableCell className="font-medium">
                        {amenity.name}
                      </TableCell>
                      <TableCell>
                        <AmenityEditDialog amenity={amenity} />
                        <AmenityDeleteDialog amenity={amenity} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default AmenityTable;
