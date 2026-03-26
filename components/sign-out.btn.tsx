"use client"

import { DropdownMenuItem } from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function SignOutButton() {
    const router = useRouter()
    const { logout } = useAuth()

    return (
        <DropdownMenuItem onClick={async () => {
            try {
                await logout()
            } finally {
                router.push("/sign-in")
            }
        }}>
            Log Out
        </DropdownMenuItem>
    )
}