import { Container, Stack } from "@mui/system"

const colors = {
    primary: '#C2EABA',
    accent: '#0AD3FF',
    secondary: '#7E5A9B',
    neutral: '#63458A',
    background: '#E1FAF9',
}

export default function PageContainer({
    children,
    rowGap
}: {
    children: React.ReactNode,
    rowGap?: number
}) {
    return (
        <Container
            fixed
            disableGutters
            maxWidth="sm"
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.background
            }}
        >
            <Stack
                minHeight="100vh"
                flexDirection="column"
                alignItems="center"
                padding="1rem"
                rowGap={rowGap}
            >
                {children}
            </Stack>
        </Container>
    )
}

