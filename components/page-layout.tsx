import {
    Stack,
} from "@chakra-ui/react"

export default function PageLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Stack
            spacing={3}
            pt={3}
            px={3}
            bgColor="#EBFFF9"
            css={{
                height: "100%",
            }}
        >
            {children}
        </Stack>
    )
}
