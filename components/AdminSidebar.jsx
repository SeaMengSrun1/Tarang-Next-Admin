import Link from "next/link";
import Image from "next/image";
import { Users, LayoutDashboard, Bookmark, User, LandPlot } from "lucide-react";

function AdminSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block bg-white">
      <div className="flex h-full max-h-screen flex-col gap-4">
        <div className="flex h-14 items-center justify-center border-b p-10 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/tarang_logo.png" alt="logo" width={150} height={50} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/venue"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LandPlot className="h-4 w-4" />
              Venue
            </Link>
            <Link
              href="/reservation"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Bookmark className="h-4 w-4" />
              Reservation
            </Link>
            <Link
              href="/team"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Team
            </Link>
            <Link
              href="/user"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <User className="h-4 w-4" />
              User
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
