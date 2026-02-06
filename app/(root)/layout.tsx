import { Navbar } from "@/components/navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-screen-xl mx-auto px-3">
      <Navbar />
      {children}
    </main>
  );
}
