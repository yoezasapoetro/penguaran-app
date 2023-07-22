import { Stack, Typography } from "@mui/joy"
import { SessionContextValue, useSession } from "next-auth/react"
import { PageContainer } from "@/components/ui"

function Greeting(props: {
    session: SessionContextValue<boolean>
}) {
    const { data } = props.session
    return (
        <Stack
            useFlexGap
            sx={{
                width: "100%",
                padding: "0.375rem 1rem",
                backgroundColor: "success.50",
                border: "1px solid",
                borderColor: "success.400",
                borderRadius: "0.5rem",
            }}
        >
            <Typography
                fontSize="lg"
                width="100%"
                textColor="primary.900"
            >
                Hi, {' '}
                {data?.user?.name}
            </Typography>
            <Typography
                width="100%"
                fontWeight={500}
                textColor="primary.900"
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
            margin={2}
        >
            <Greeting session={session} />

            <Typography
                width="100%"
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Pengeluaran Hari Ini
            </Typography>
            <Stack
                sx={{
                    width: "100%",
                    padding: "0.375rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral.400",
                    borderRadius: "0.5rem",
                    boxShadow: "sm",
                }}
            >
            </Stack>
            <Typography
                width="100%"
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Pengeluaran Bulan Ini
            </Typography>
            <Stack
                width="100%"
                sx={{
                    width: "100%",
                    padding: "0.375rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral.400",
                    borderRadius: "0.5rem",
                    boxShadow: "sm",
                }}
            >
            </Stack>
            <Typography
                width="100%"
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Ratio Pengeluaran Bulan Ini
            </Typography>
            <Stack
                width="100%"
                sx={{
                    width: "100%",
                    padding: "0.375rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral.400",
                    borderRadius: "0.5rem",
                    boxShadow: "sm",
                }}
            >
            </Stack>
        </PageContainer>
    )
}
