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
  CreditCardIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  StoreIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const UserButton = () => {
  const session = useSession();

  const onLogOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session.data?.user?.image ? (
          <Image
            src={session.data?.user?.image}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <User2Icon size={40} className="rounded-full" />
        )}
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
            <User2Icon size={50} className="rounded-full" />
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
