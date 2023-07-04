import {
    Container,
    Stack,
    StackProps,
} from "@mui/joy"

import BottomNavigation from "./BottomNavigation"

export default function PageContainer(props: StackProps & {
    children: React.ReactNode,
}) {
    const { children, ...stackProps } = props
    return (
        <>
            <Container
                fixed
                disableGutters
                maxWidth="sm"
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Stack
                    flexDirection="column"
                    alignItems="center"
                    padding="0rem 1rem 1rem 1rem"
                    height="100%"
                    {...stackProps}
                >
                    {children}
                </Stack>
            </Container>
            <BottomNavigation />
        </>
    )
}

