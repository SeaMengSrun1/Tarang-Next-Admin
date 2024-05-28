"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Users,
  LayoutDashboard,
  Bookmark,
  User,
  LandPlot,
  Settings,
} from "lucide-react";

function AdminSidebar() {
  const pathName = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block bg-white">
      <div className="flex h-full max-h-screen flex-col gap-4">
        <div className="flex h-14 items-center justify-center border-b p-10 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/tarang_logo.png" alt="logo" width={150} height={50} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4 gap-2">
            <Link
              href="/"
              className={
                pathName === "/"
                  ? "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-[#f5f5f5]"
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/venue"
              className={
                pathName === "/venue"
                  ? "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-[#f5f5f5]"
              }
            >
              <LandPlot className="h-4 w-4" />
              Venue
            </Link>
            <Link
              href="/reservation"
              className={
                pathName === "/reservation"
                  ? "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-[#f5f5f5]"
              }
            >
              <Bookmark className="h-4 w-4" />
              Reservation
            </Link>
            <Link
              href="/team"
              className={
                pathName === "/team"
                  ? "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-[#f5f5f5]"
              }
            >
              <Users className="h-4 w-4" />
              Team
            </Link>
            <Link
              href="/user"
              className={
                pathName === "/user"
                  ? "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-[#f5f5f5]"
              }
            >
              <User className="h-4 w-4" />
              User
            </Link>
            <Link
              href="/setting"
              className={
                pathName === "/setting"
                  ? "bg-[#f5f5f5] flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-[#f5f5f5]"
              }
            >
              <Settings className="h-4 w-4" />
              Setting
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
