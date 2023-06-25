import { useRouter } from "next/navigation"

import {
    Typography,
    Stack,
    Button,
    Card,
    CardContent,
    AspectRatio,
} from "@mui/joy"

import Image, { StaticImageData } from "next/image"

import JenisPengeluaranIcon from "@/assets/icons/jenis_pengeluaran.png"
import SumberDanaIcon from "@/assets/icons/sumber_dana.png"
import SellerIcon from "@/assets/icons/seller.png"
import { PageContainer } from "@/components/ui"

function BottomNavigation() {
    return (
        <Stack
            position="absolute"
            bottom={0}
        >
            Nav Here
        </Stack>
    )
}

const SettingItem = ({
    title,
    subtitle,
    image,
    link,
    linkText = "Kelola"
}: {
    title: string,
    subtitle: string,
    image: StaticImageData
    link: string,
    linkText?: string
}) => {
    const router = useRouter()
    return (
        <Card
            orientation="horizontal"
            sx={{
                alignItems: "center",
            }}
            onClick={() => {
                router.push(link)
            }}
        >
            <AspectRatio
                ratio={1}
                variant="plain"
                sx={{
                    width: 40,
                    height: 40
                }}
            >
                <Image src={image} alt={title} />
            </AspectRatio>
            <CardContent
                orientation="horizontal"
                sx={{
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between"
                }}
            >
                <Stack>
                    <Typography lineHeight="md" fontSize="lg">{title}</Typography>
                    <Typography lineHeight="sm" fontSize="sm">{subtitle}</Typography>
                </Stack>
                <Button
                    variant="plain"
                    size="sm"
                    onClick={() => {
                        router.push(link)
                    }}
                >
                    {linkText}
                </Button>
            </CardContent>
        </Card>
    )
}

export default function Pengaturan() {
    return (
        <PageContainer
            rowGap={2}
        >
            <Typography
                level="h5"
                width="100%"
            >
                Transaksi
            </Typography>
            <Stack
                spacing={3}
                width="100%"
            >
                <SettingItem
                    title="Jenis Pengeluaran"
                    subtitle="Kelompokan transaksi pengeluaran berdasarkan jenis."
                    image={JenisPengeluaranIcon}
                    link="/pengaturan/jenis_pengeluaran"
                />
                <SettingItem
                    title="Sumber Dana"
                    subtitle="Tentukan sumber dana yang anda bayarkan saat bertransaksi."
                    image={SumberDanaIcon}
                    link="/pengaturan/sumber_dana"
                />
                <SettingItem
                    title="Penjual"
                    subtitle="Penjual merupakan pihak yang bertransaksi dengan anda."
                    image={SellerIcon}
                    link="/pengaturan/penjual"
                />
            </Stack>
            <Typography
                level="h5"
                width="100%"
            >
                Umum
            </Typography>
            <Stack
                spacing={3}
                width="100%"
            >
                <SettingItem
                    title="Akun"
                    subtitle="Kelola akun anda"
                    image={JenisPengeluaranIcon}
                    link="/pengaturan/akun"
                />
            </Stack>

            <BottomNavigation />
        </PageContainer>
    )
}
