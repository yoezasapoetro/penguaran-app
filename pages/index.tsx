import { Card, Stack, Typography } from "@mui/joy"
import { SessionContextValue, useSession } from "next-auth/react"
import { PageContainer } from "@/components/ui"
import colors from "@/components/colors"

function Greeting(props: {
    session: SessionContextValue<boolean>
}) {
    const { data } = props.session
    return (
        <Stack
            useFlexGap
            width="100%"
        >
            <Typography
                fontSize="lg"
                lineHeight="sm"
                textColor={colors.neutral}
            >
                Hi, {' '}
                {data?.user?.name}
            </Typography>
            <Typography
                level="body1"
                lineHeight="sm"
                textColor={colors.secondary}
            >
                Selamat Datang!
            </Typography>
        </Stack>
    )
}

export default function Home() {
    const session = useSession()

    return (
        <PageContainer
            rowGap={2}
        >
            <Greeting session={session} />

            <Stack
                useFlexGap
                width="100%"
                spacing={2}
            >
                <Card>
                    Summary
                </Card>
                <Card>
                    Summary
                </Card>
                <Card>
                    Summary
                </Card>
            </Stack>
        </PageContainer>
    )
}
