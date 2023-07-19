import { Container, Stack } from "@mui/joy"

export default function PageLayout(props: {
    children: React.ReactNode
}) {
    return (
        <Container
            fixed
            disableGutters
            maxWidth="sm"
            sx={{
                minWidth: "100vw",
                height: "100%",
                width: "100%",
                position: "relative",
            }}
        >
            <Stack
                height="100%"
                sx={{
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                {props.children}
            </Stack>
        </Container>
    )
}

