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
