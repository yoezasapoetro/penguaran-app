import {
    Stack,
} from "@chakra-ui/react"

export default function PageLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Stack
            spacing={3}
            px={4}
            pt={2}
            bgColor="gray.50"
            css={{
                height: "100vh",
            }}
        >
            {children}
        </Stack>
    )
}
