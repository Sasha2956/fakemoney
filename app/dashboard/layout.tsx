import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
        <Navbar className="max-w-screen-2xl mx-auto p-3" />
      <div className="flex min-h-screen">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
