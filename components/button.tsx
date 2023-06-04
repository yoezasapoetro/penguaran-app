import { SignOutButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"

export const LogoutButton = () => {
    const logoutButtonClassName = `
        w-full py-2
        flex justify-center items-center gap-x-2
        rounded-full bg-red-700
        text-white
    `
    return (
        <SignOutButton>
            <button className={logoutButtonClassName}>
                <LogOut />
                Keluar dari Aplikasi
            </button>
        </SignOutButton>
    )
}

