import { getProviders, signIn } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import {
    Container,
    Stack,
    Button,
    Icon,
    Text,
} from "@chakra-ui/react"
import { BsGoogle as GoogleIcon } from "react-icons/bs"

export async function getServerSideProps(context: any) {
    const providers = await getProviders()
    const token = await getToken(context)

    if (!!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: { providers }
    }
}

type LoginPageProps = {
    providers: any,
}

export default function Login({
    providers
}: LoginPageProps) {
    const icons: { [key: string]: JSX.Element } = {
        google: <Icon as={GoogleIcon} w={4} h={4} color="green.700" />
    }

    return (
        <Container h="100vh">
            <Stack
                h="70%"
                mx={10}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Text fontSize="2xl">Penguaran App</Text>
                <Stack
                    w="100%"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {providers && Object.entries(providers).map(([providerName, provider]: [string, any]) => {
                        const socialIcon = icons[providerName]
                        return (
                            <Button
                                w="100%"
                                key={provider.id}
                                onClick={() => signIn(providerName)}
                                variant="outline"
                                fontSize={12}
                                fontWeight="normal"
                                leftIcon={socialIcon}
                                iconSpacing={2}
                            >
                                <span>Lanjutkan dengan {provider.name}</span>
                            </Button>
                        )
                    })}
                </Stack>
            </Stack>
        </Container>
    );
}
