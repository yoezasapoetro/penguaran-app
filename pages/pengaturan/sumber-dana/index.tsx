import {
    PageLayout,
    PageHeader,
    CreateButton,
} from "@/components/ui"

export default function SumberDana() {
    const createCallback = () => {
    }

    return (
        <>
            <PageLayout>
                <PageHeader
                    title="Pengaturan"
                    subtitle="Sumber Dana"
                    backUrl="/pengaturan"
                />
                <CreateButton onClick={createCallback} />
            </PageLayout>
        </>
    )
}
