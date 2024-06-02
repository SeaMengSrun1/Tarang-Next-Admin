"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  LayoutDashboard,
  Bookmark,
  User,
  LandPlot,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AdminHeader() {
  // const { logout } = useAuth();
  const pathName = usePathname();
  return (
    <header className="flex md:hidden h-14 items-center gap-4 border-b bg-muted/40 p-4 md:p-10 lg:h-[60px] bg-white justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col max-w-[250px] sm:max-w-[250px]"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold mx-auto"
          >
            <Image src="/tarang_logo.png" alt="logo" width={150} height={50} />
            <span className="sr-only">Tarang</span>
          </Link>
          <nav className="grid text-lg font-medium">
            <Link
              href="/"
              className={
                pathName === "/"
                  ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                  : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/venue"
              className={
                pathName === "/venue"
                  ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                  : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
              }
            >
              <LandPlot className="h-5 w-5" />
              Venue
            </Link>
            <Link
              href="/reservation"
              className={
                pathName === "/reservation"
                  ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                  : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
              }
            >
              <Bookmark className="h-5 w-5" />
              Reservation
            </Link>
            <Link
              href="/team"
              className={
                pathName === "/team"
                  ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                  : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
              }
            >
              <Users className="h-5 w-5" />
              Team
            </Link>
            <Link
              href="/user"
              className={
                pathName === "/user"
                  ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                  : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
              }
            >
              <User className="h-5 w-5" />
              User
            </Link>
            <Link
              href="/setting"
              className={
                pathName === "/setting"
                  ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                  : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
              }
            >
              <Settings className="h-5 w-5" />
              Setting
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {/* <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            {/* <Button className="w-full" onClick={logout}>
              Logout
            </Button> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default AdminHeader;
