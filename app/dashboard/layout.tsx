import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/navbar";
import { requireUser } from "@/lib/require-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return (
    <main className="h-screen overflow-visible">
      <Navbar hasMobileSidebar />
      <div className="flex flex-grow p-2 min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </main>
  );
}
