import StatisticsCard from "@/components/StatisticsCard";
import DashboardReservationTable from "@/components/DashboardReservationTable";
import DashboardTeamTable from "@/components/DashboardTeamTable";
import AdminLayout from "./AdminLayout";
import Profile from "@/components/Profile";

function AdminHomePage() {
  return (
    <AdminLayout>
      <StatisticsCard />
      <div className="space-y-4 xl:space-y-10">
        <DashboardReservationTable />
        <DashboardTeamTable />
        <Profile />
      </div>
    </AdminLayout>
  );
}

export default AdminHomePage;
