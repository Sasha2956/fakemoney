"use client"

import { sidebarLinks } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardLinks = () => {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col gap-y-4">
      {sidebarLinks.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={cn(
            "rounded-lg py-4 px-2 bg-gray-100 flex gap-2",
            pathname === link.href && "bg-white"
          )}
        >
          <link.icon />
          {link.name}
        </Link>
      ))}
    </div>
  );
};
