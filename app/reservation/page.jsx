import Calendar from "@/components/Calendar";
import ReservationTable from "@/components/ReservationTable";
import AdminLayout from "../AdminLayout";

function ReservationPage() {
  return (
    <AdminLayout>
      <Calendar />
      <ReservationTable />
    </AdminLayout>
  );
}

export default ReservationPage;
