import { Container, Stack } from "@mui/joy"

import colors from "../colors"

export default function PageLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Container
            fixed
            disableGutters
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                height: "100%",
                width: "100%",
                backgroundColor: colors.background,
                position: "relative",
            }}
        >
            <Stack height="100%">
                {children}
            </Stack>
        </Container>
    )
}

