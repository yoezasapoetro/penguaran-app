"use client"

import { usePathname } from "next/navigation"
import AppHeader from "@/app/components/header"

export default function PengaturanLayout(
    { children }: { children: React.ReactNode }
) {
    const pathname = usePathname()
    let subtitle = ""

    if (pathname.includes("jenis_pengeluaran")) {
        subtitle = "Jenis Pengeluaran"
    }

    if (pathname.includes("penjual")) {
        subtitle = "Penjual"
    }

    if (pathname.includes("akun")) {
        subtitle = "Akun"
    }

    return (
        <section className="h-full">
            <AppHeader title="Pengaturan" subtitle={subtitle} />
            {children}
        </section>
    )
}
