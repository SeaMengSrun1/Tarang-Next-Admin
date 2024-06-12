import StatisticsCard from "@/components/StatisticsCard";
import DashboardReservationTable from "@/components/DashboardReservationTable";
import AdminLayout from "./AdminLayout";
import Profile from "@/components/Profile";
import PendingReservation from "@/components/PendingReservation";

function AdminHomePage() {
  return (
    <AdminLayout>
      <StatisticsCard />
      <div className="space-y-4 xl:space-y-10">
        <DashboardReservationTable />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-10">
          <Profile />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminHomePage;
