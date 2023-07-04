import {
    Button,
} from "@mui/joy"

import {
    PageHeader,
    PageLayout,
} from "@/components/ui"
import { signOut } from "next-auth/react"

export default function Akun() {
    return (
        <>
            <PageHeader
                title="Pengaturan"
                subtitle="Akun"
                backUrl="/pengaturan"
            />
            <PageLayout>
                <Button
                    fullWidth
                    onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
                >
                    Keluar
                </Button>
            </PageLayout>
        </>
    )
}
