import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen overflow-visible">
      <Navbar hasMobileSidebar />
      <div className="flex flex-grow p-2">
        <Sidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </main>
  );
}
