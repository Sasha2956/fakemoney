import Link from "next/link";
import { Harmattan } from "next/font/google";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { DashboardLinks } from "./dashboard-links";
import { UserButton } from "../auth/user-button";

const font = Harmattan({
  subsets: ["latin"],
  weight: ["400"],
});

interface DashboardNavbarProps {
  className: string;
}

export const DashboardNavbar = ({ className }: DashboardNavbarProps) => {
  return (
    <header
      className={cn("flex items-center justify-between py-7 w-full", className)}
    >
      <Link href="/">
        <h3 className={cn("text-xl sm:text-3xl", font.className)}>
          fakemoney.
        </h3>
      </Link>
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="lg:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="items-start">
            <SheetTitle className={cn("text-3xl", font.className)}>
              fakemoney.
            </SheetTitle>
          </SheetHeader>
          <DashboardLinks />
          <SheetFooter className="mt-10">
            <UserButton size="large" className="w-full" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <UserButton className="hidden lg:block" />
    </header>
  );
};
