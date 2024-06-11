import Image from "next/image";
import AdminLayout from "./AdminLayout";

function NotFound() {
  return (
    <AdminLayout>
      <div className="flex justify-center items-center gap-2 h-full">
        <Image src="/favicon.ico" width={32} height={32} alt="tarang_icon" />
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
      </div>
    </AdminLayout>
  );
}

export default NotFound;
