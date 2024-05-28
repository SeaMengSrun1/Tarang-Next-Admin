"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamsWithPagination } from "@/services/team";
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
// import TeamCreateDialog from "./TeamCreateDialog";
import TeamEditDialog from "./TeamEditDialog";
import TeamDeleteDialog from "./TeamDeleteDialog";
import Spinner from "./Spinner";

function TeamTable() {
  const [paginationUrl, setPaginationUrl] = useState("/api/teams");
  const { data: teams, isLoading } = useQuery({
    queryKey: ["teams", paginationUrl],
    queryFn: () => getTeamsWithPagination(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Team</CardTitle>
            <CardDescription>Manage Team</CardDescription>
          </div>
          {/*<TeamCreateDialog />*/}
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            {teams.data.data.teams.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Teams</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Logo</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.data.data.teams.map((team, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{team.id}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-full object-cover"
                          height="64"
                          src={team.logo}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.sportType.name}</TableCell>
                      <TableCell>
                        <TeamEditDialog team={team} />
                        <TeamDeleteDialog teamId={team.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-5</strong> teams
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  {teams.data.meta.links.map((link, index) => (
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

export default TeamTable;
