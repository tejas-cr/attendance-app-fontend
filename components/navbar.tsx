"use client"

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
// import { getSession, signOut } from "@/lib/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out.btn";



export default function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <div className="flex">
                    <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                        SchedIO
                    </Link>

                    <Button
                        variant="ghost"
                        className="text-gray-700 hover:text-black"
                    >
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </Button>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in">
                            <Button variant="ghost" className="text-gray-700 hover:text-black">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="bg-primary hover:bg-primary/90">
                                Sign Up
                            </Button>
                        </Link>

                    </div>
                    {/* </Link> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback
                                        className="bg-primary text-white"
                                    >
                                        {"A"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {"Username"}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {"example@gmail.com"}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <SignOutButton />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}