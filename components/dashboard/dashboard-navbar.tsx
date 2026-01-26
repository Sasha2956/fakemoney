import Link from "next/link";
import { Harmattan } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserButton } from "../auth/user-button";

const font = Harmattan({
  subsets: ["latin"],
  weight: ["400"],
});

export const DashboardNavbar = () => {
  return (
    <header
      className="flex items-center justify-between py-7 w-full max-w-screen-xl mx-auto px-3"
    >
      <Link href="/">
        <h3 className={cn("text-3xl", font.className)}>
          fakemoney.
        </h3>
      </Link>
      <UserButton className="hidden lg:block" />
    </header>
  );
};
