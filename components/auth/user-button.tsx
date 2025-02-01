"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import {
  ChevronsUpDownIcon,
  CreditCardIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  StoreIcon,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import initials from "initials";

interface UserButtonProps {
  size?: "default" | "large";
  className?: string;
}

export const UserButton = ({
  size = "default",
  className,
}: UserButtonProps) => {
  const session = useSession();

  const onLogOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("flex justify-between items-center", className)}
      >
        <div className="flex gap-2">
          {session.data?.user?.image ? (
            <Image
              src={session.data?.user?.image}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div
              style={{ backgroundColor: session.data?.user.imageBgColor }}
              className="flex w-[50px] h-[50px] rounded-full"
            >
              <p
                className="flex w-full items-center justify-center font-bold uppercase"
                style={{ color: session.data?.user.imageTextColor }}
              >
                {initials(session.data?.user?.name as string)}
              </p>
            </div>
          )}
          {size === "large" && (
            <div>
              <p className="font-bold text-start">{session.data?.user?.name}</p>
              <p className="truncate text-muted-foreground max-w-[230px]">
                {session.data?.user?.email}
              </p>
            </div>
          )}
        </div>
        {size === "large" && <ChevronsUpDownIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex gap-2 m-2">
          {session.data?.user?.image ? (
            <Image
              src={session.data?.user?.image}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div
              style={{ backgroundColor: session.data?.user.imageBgColor }}
              className="flex w-[50px] h-[50px] rounded-full"
            >
              <p
                className="flex w-full items-center justify-center font-bold uppercase"
                style={{ color: session.data?.user.imageTextColor }}
              >
                {initials(session.data?.user?.name as string)}
              </p>
            </div>
          )}
          <div>
            <p className="font-bold">{session.data?.user?.name}</p>
            <p className="truncate text-muted-foreground max-w-[160px]">
              {session.data?.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboardIcon />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/cards">
            <CreditCardIcon />
            Cards
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/transactions">
            <DollarSignIcon />
            Transactions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/stores">
            <StoreIcon />
            Stores
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <SettingsIcon />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onLogOut()}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
