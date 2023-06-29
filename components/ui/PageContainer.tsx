import { Container, Stack } from "@mui/system"

import colors from "../colors"
import BottomNavigation from "./BottomNavigation"

export default function PageContainer({
    children,
    rowGap,
    paddingTop = 1
}: {
    children: React.ReactNode,
    rowGap?: number,
    paddingTop?: number
}) {
    return (
        <>
            <Container
                fixed
                disableGutters
                maxWidth="sm"
                sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: "100vh",
                    backgroundColor: colors.background,
                }}
            >
                <Stack
                    flexDirection="column"
                    alignItems="center"
                    padding="0rem 1rem 1rem 1rem"
                    paddingTop={paddingTop}
                    height="100%"
                    rowGap={rowGap}
                >
                    {children}
                </Stack>
            </Container>
            <BottomNavigation />
        </>
    )
}

