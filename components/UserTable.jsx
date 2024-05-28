"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/user";
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
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import UserCreateDialog from "./UserCreateDialog";
import UserEditDialog from "./UserEditDialog";
import UserDeleteDialog from "./UserDeleteDialog";
import Spinner from "./Spinner";

function UserTable() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage Users</CardDescription>
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
            {users.length === 0 ? (
              <div className="h-full flex justify-center items-center gap-4">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Users</h1>
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
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="profile image"
                          className="aspect-square rounded-full object-cover"
                          height="64"
                          src={user.photo || "https://github.com/shadcn.png"}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.phone || "XXX-XXX-XXX"}</TableCell>
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
            {/* <div>
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
            </div> */}
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default UserTable;
