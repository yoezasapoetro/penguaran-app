import {
    Container
} from "@chakra-ui/react"

import PageHeader from "@/components/header"
import PageLayout from "@/components/page-layout"

export default function Penjual() {
    return (
        <Container p={0} minH="100vh">
            <PageHeader
                title="Pengaturan"
                subtitle="Tenant"
            />
            <PageLayout>
            </PageLayout>
        </Container>
    )
}
