import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100svh] flex flex-col">
      <DashboardNavbar className="max-w-screen-xl mx-auto p-3" />
      <div className="flex flex-grow">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
