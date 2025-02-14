import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen overflow-visible">
      <DashboardNavbar />
      <div className="flex flex-grow p-2">
        <Sidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </main>
  );
}
