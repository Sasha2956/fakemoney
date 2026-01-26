import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { DashboardLinks } from "./dashboard/dashboard-links";
import { UserButton } from "./auth/user-button";
import { logoFont } from "@/constants/fonts";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="lg:hidden" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="items-start">
          <SheetTitle className={cn("text-3xl", logoFont.className)}>
            fakemoney.
          </SheetTitle>
        </SheetHeader>
        <DashboardLinks />
        <SheetFooter className="mt-10">
          <UserButton size="large" className="w-full" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
