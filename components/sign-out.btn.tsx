"use client"

import { DropdownMenuItem } from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
    const router = useRouter()

    return (
        <DropdownMenuItem onClick={async () => {
            // const result = await signOut();
            const result = true;
            if (result) {
                router.push("/sign-in")
            } else {
                alert("Error signing out")
            }
        }}>
            Log Out
        </DropdownMenuItem>
    )
}