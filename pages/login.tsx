import { getProviders, signIn } from "next-auth/react"

import {
    FcGoogle as GoogleIcon
} from "react-icons/fc"
import Image from "next/image"
import {
    Button,
    Stack,
    Typography,
    AspectRatio
} from "@mui/joy"

import AuthenticationImage from "@/assets/illustrations/authentication.png"
import AppLogoImage from "@/assets/icons/app_icon.png"
import colors from "@/components/colors"

function LoginPage({ providers }: any) {
    return (
        <Stack
            useFlexGap
            flexGrow={0}
            flexShrink={0}
            alignItems="center"
            justifyContent="center"
            padding="1.5rem 2rem 2rem 2rem"
            rowGap={2}
        >
            <Typography
                level="body1"
                textColor={colors.neutral}
                lineHeight="sm"
                width="100%"
            >
                Mulai tanpa repot akan mengumpulkan kembali catatan dari berbagai sumber.
            </Typography>
            <Typography
                level="body2"
                lineHeight="sm"
                textColor={colors.secondary}
                textAlign="center"
                width="100%"
            >
                Lanjutkan menggunakan akun sosial anda
            </Typography>
            <Stack
                useFlexGap
                alignItems="center"
                rowGap={1}
            >
                {Object.values(providers).map((provider: any) => (
                    <Button
                        fullWidth
                        key={provider.name}
                        startDecorator={<GoogleIcon size={21} />}
                        variant="outlined"
                        sx={{
                            '--Button-gap': '8px',
                            borderRadius: '5rem'
                        }}
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    >
                        {provider.name}
                    </Button>
                ))}
            </Stack>
        </Stack>
    )
}

function Jumbotron() {
    return (
        <Stack
            useFlexGap
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            flexGrow={1}
            flexShrink={0}
        >
            <AppLogo />
            <AspectRatio
                variant="plain"
                ratio="3/4"
                objectFit="contain"
                sx={{
                    width: "80%",
                    height: "30%"
                }}
            >
                <Image
                    src={AuthenticationImage}
                    alt="Penguaran Auth Image"
                />
            </AspectRatio>
        </Stack>
    )
}

function AppLogo() {
    return (
        <Stack
            useFlexGap
            width="100%"
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnGap={2}
        >
            <AspectRatio
                variant="plain"
                ratio="1"
                sx={{
                    width: "15%"
                }}
            >
                <Image
                    src={AppLogoImage}
                    alt="App Logo"
                />
            </AspectRatio>
            <Typography
                level="h3"
                textColor={colors.accent}
            >
                Penguaran
            </Typography>
        </Stack>
    )
}

export async function getServerSideProps(context: any) {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

export default function Login({
    providers
}: { providers: any }) {
    return (
        <Stack
            useFlexGap
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            minHeight="100vh"
            maxWidth="sm"
            sx={{
                backgroundColor: colors.neutral
            }}
        >
            <Jumbotron />
            <Stack
                width="100%"
                borderRadius="1.5rem 1.5rem 0rem 0rem"
                sx={{
                    backgroundColor: colors.background
                }}
            >
                <LoginPage providers={providers}></LoginPage>
            </Stack>
        </Stack>
    )
}
