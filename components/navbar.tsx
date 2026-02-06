"use client";

import Link from "next/link";
import { Button } from "./ui/button";
// import { getSession, signOut } from "@/lib/auth/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out.btn";
import { useAuth } from "@/context/auth-context";
import { Bell } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center px-4 justify-end">
        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-neutral-100 transition"
          >
            <Bell className="h-5 w-5 text-neutral-700" />

            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              0
            </span>
          </Link>
        {/* </div> */}

        {/* <div className="flex items-center gap-4"> */}
          {/* </Link> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <SignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}