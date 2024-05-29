import SportTypeTable from "@/components/SportTypeTable";
import AdminLayout from "../AdminLayout";
import AmenityTable from "@/components/AmenityTable";

function SettingPage() {
  return (
    <AdminLayout>
      <AmenityTable />
      <SportTypeTable />
    </AdminLayout>
  );
}

export default SettingPage;
