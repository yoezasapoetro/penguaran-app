import {
    Container
} from "@chakra-ui/react"

import PageHeader from "@/components/header"
import PageLayout from "@/components/page-layout"

export default function Akun() {
    return (
        <Container p={0} minH="100vh">
            <PageHeader
                title="Pengaturan"
                subtitle="Akun"
                rootUrl="/pengaturan"
            />
            <PageLayout>
            </PageLayout>
        </Container>
    )
}
