import "server-only";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const requireUser = async () => {
  const session = await auth();

  if (!session?.user) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? "/";

    if (pathname.startsWith("/dashboard")) {
      redirect("/login");
    }

    redirect(`/login?next=${encodeURIComponent(pathname)}`);
  }

  return session.user;
};
