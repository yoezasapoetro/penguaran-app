import {
    Alert,
    AspectRatio,
    Badge,
    Box,
    Button,
    Stack,
    Typography,
    TypographyProps,
} from "@mui/joy"
import {
    BiLogOutCircle as LogoutIcon,
} from "react-icons/bi"
import {
    GiPriceTag as SubscriptionIcon,
} from "react-icons/gi"
import NextImage from "next/image"

import {
    PageHeader,
    PageLayout,
} from "@/components/ui"
import { SessionContextValue, signOut, useSession } from "next-auth/react"

function Profile(props: {
    session: SessionContextValue<boolean>
}) {
    const user = props.session.data?.user
    const labelProps: TypographyProps = {
        textColor: "primary.900",
        textAlign: "left",
        fontSize: "sm",
        fontWeight: 500,
        gutterBottom: true,
    }
    const profileProps: TypographyProps = {
        fontSize: "md",
        textColor: "primary.900",
        textAlign: "left",
        sx: {
            border: "1px solid",
            borderColor: "neutral.300",
            p: 1,
        }
    }

    return (
        <Stack
            useFlexGap
        >
            <Typography
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Profil
            </Typography>
            <Stack
                useFlexGap
                rowGap={1}
            >
                <Stack
                    useFlexGap
                    width="100%"
                    alignItems="center"
                >
                    {user && user.name && user.image && <AspectRatio
                        ratio={1}
                        sx={{
                            width: "5rem",
                            height: "5rem",
                            borderRadius: "4rem",
                        }}
                    >
                        <NextImage
                            alt={user.name}
                            src={user.image}
                            width={100}
                            height={100}
                        />
                    </AspectRatio>}
                </Stack>

                <Stack
                    useFlexGap
                    width="100%"
                    flexWrap="wrap"
                    rowGap={1}
                >
                    <Box>
                        <Typography
                            {...labelProps}
                        >
                            Nama
                        </Typography>
                        <Typography
                            {...profileProps}
                        >
                            {user?.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            {...labelProps}
                        >
                            E-Mail
                        </Typography>
                        <Typography
                            {...profileProps}
                        >
                            {user?.email}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}

function Subscription() {
    return (
        <Stack
            useFlexGap
            rowGap={1}
        >
            <Box>
                <Badge
                    badgeContent="Segera hadir"
                    badgeInset="50% -55%"
                >
                    <Typography
                        fontSize="lg"
                        fontWeight={500}
                        textColor="primary.900"
                    >
                        Langganan
                    </Typography>
                </Badge>
            </Box>
            <Alert
                variant="outlined"
            >
                <Box>
                    <Typography
                        fontWeight={500}
                        textColor="inherit"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: 2,
                        }}
                    >
                        <SubscriptionIcon size={18} color="inherit" />
                        <span>Paket Berlangganan</span>
                    </Typography>
                    <Typography
                        fontWeight={300}
                        fontSize="sm"
                        textColor="inherit"
                    >
                        Untuk memaksimalkan platform agar terus tumbuh dan memberikan dukungan
                        kepada anda, kami akan memberikan penawaran kepada anda biaya untuk beberapa fitur menarik.
                    </Typography>
                </Box>
            </Alert>
        </Stack>
    )
}

export default function Akun() {
    const session = useSession()

    return (
        <>
            <PageHeader
                title="Pengaturan"
                subtitle="Akun"
                backUrl="/settings"
            />
            <PageLayout>
                <Stack
                    useFlexGap
                    rowGap={3}
                    padding="1rem"
                    marginTop={9}
                    marginBottom={8}
                >
                    <Profile session={session} />
                    <Subscription />
                </Stack>
                <Button
                    sx={{
                        fontWeight: 400,
                        backgroundColor: "primary.900",
                        borderRadius: "0",
                        color: "success.300",
                        boxShadow: "md",
                        position: "fixed",
                        bottom: "1rem",
                        left: "1rem",
                        right: "1rem",
                    }}
                    startDecorator={<LogoutIcon size={18} />}
                    onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
                >
                    Keluar
                </Button>
            </PageLayout>
        </>
    )
}
