"use client";

import { sidebarLinks } from "@/constants/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const DashboardLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4">
      {sidebarLinks.map((link, index) => (
        <Button key={index} className="justify-start" asChild variant={pathname === link.href ? "outline" : "ghost"}>
          <Link
            href={link.href}
            className="flex gap-2 py-6"
          >
            <link.icon />
            {link.name}
          </Link>
        </Button>
      ))}
    </div>
  );
};
