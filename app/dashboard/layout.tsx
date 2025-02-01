import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100svh] flex flex-1 flex-col">
      <DashboardNavbar />
      <div className="flex flex-grow p-2 flex-1">
        <Sidebar />
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </main>
  );
}
