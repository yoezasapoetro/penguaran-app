import { useRouter } from "next/navigation"
import {
    Container,
    Stack,
    Flex,
    Text,
    Heading,
    Card,
    CardBody,
    Center,
    Spacer,
    Box,
    Button,
} from "@chakra-ui/react"
import {
    ShoppingBagIcon,
    WalletIcon,
    SmilePlusIcon,
    UserSquareIcon,
} from "lucide-react"

const SettingItem = ({
    title,
    subtitle,
    icon,
    link,
    linkText = "Kelola"
}: {
    title: string,
    subtitle: string,
    icon: JSX.Element,
    link: string,
    linkText?: string
}) => {
    const router = useRouter()
    return (
        <Card variant="outline" borderWidth="0" boxShadow="xs" size="sm">
            <CardBody>
                <Flex direction="row" alignItems="center">
                    <Center css={{ paddingRight: ".75rem", paddingLeft: "0" }}>
                        {icon}
                    </Center>
                    <Stack spacing={0} w={"60%"}>
                        <Text css={{ fontWeight: "600" }}>{title}</Text>
                        <Text fontSize="xs">{subtitle}</Text>
                    </Stack>
                    <Spacer />
                    <Button
                        variant="outline"
                        fontSize="xs"
                        size="sm"
                        onClick={() => {
                            router.push(link)
                        }}
                    >
                        {linkText}
                    </Button>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default function Pengaturan() {
    return (
        <Container p={0} minH="100vh">
            <Box
                p={4}
                css={{
                    borderBottom: "1px solid #f3f3f3",
                }}
            >
                <Heading>Pengaturan</Heading>
            </Box>
            <Stack
                spacing={3}
                px={4}
                pt={2}
                bgColor="gray.50"
                css={{
                    height: "100vh",
                }}
            >
                <Stack
                    spacing={3}
                >
                    <Text>Transaksi</Text>
                    <SettingItem
                        title="Jenis Pengeluaran"
                        subtitle="Kelompokan transaksi pengeluaran berdasarkan jenis."
                        icon={<ShoppingBagIcon size={24} strokeWidth={1} />}
                        link="/pengaturan/jenis_pengeluaran"
                    />
                    <SettingItem
                        title="Sumber Dana"
                        subtitle="Tentukan sumber dana yang anda bayarkan saat bertransaksi."
                        icon={<WalletIcon size={24} strokeWidth={1} />}
                        link="/pengaturan/sumber_dana"
                    />
                    <SettingItem
                        title="Tenant"
                        subtitle="Tenant merupakan tempat dimana anda melakukan transaksi."
                        icon={<UserSquareIcon size={24} strokeWidth={1} />}
                        link="/pengaturan/penjual"
                    />
                </Stack>
                <Stack
                    spacing={3}
                >
                    <Text>Umum</Text>
                    <SettingItem
                        title="Akun"
                        subtitle="Kelola akun anda"
                        icon={<SmilePlusIcon size={24} strokeWidth={1} />}
                        link="/pengaturan/akun"
                    />
                </Stack>
            </Stack>
        </Container>
    )
}
