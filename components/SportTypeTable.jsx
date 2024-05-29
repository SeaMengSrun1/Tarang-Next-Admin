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
import { getSportTypes } from "@/services/sport";
import SportTypeCreateDialog from "./SportTypeCreateDialog";
import SportTypeEditDialog from "./SportTypeEditDialog";
import SportTypeDeleteDialog from "./SportTypeDeleteDialog";
import Spinner from "./Spinner";

function SportTypeTable() {
  const { data: sportTypes, isLoading } = useQuery({
    queryKey: ["allSportTypes"],
    queryFn: getSportTypes,
  });
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Sport Types</CardTitle>
            <CardDescription>Manage Sport Types</CardDescription>
          </div>
          <SportTypeCreateDialog />
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {sportTypes.sport_types.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Sport Types</h1>
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
                  {sportTypes.sport_types.map((sportType, index) => (
                    <TableRow key={index}>
                      <TableCell>{sportType.id}</TableCell>
                      <TableCell className="font-medium">
                        {sportType.name}
                      </TableCell>
                      <TableCell>
                        <SportTypeEditDialog sport={sportType} />
                        <SportTypeDeleteDialog sport={sportType} />
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

export default SportTypeTable;
