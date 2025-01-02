import "server-only";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login")
  }

  return session.user
};
