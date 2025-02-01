import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-blue-400">
      {children}
    </main>
  );
};
