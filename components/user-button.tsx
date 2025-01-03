import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { CreditCardIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="https://github.com/shadcn.png"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LayoutDashboardIcon />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <CreditCardIcon />
            Cards
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
