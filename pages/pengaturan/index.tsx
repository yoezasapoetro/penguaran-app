import { useRouter } from "next/navigation"

import {
    Typography,
    Stack,
    IconButton,
    Card,
    CardContent,
    AspectRatio,
    Box,
} from "@mui/joy"

import {
    SlArrowRight as ContinueIcon
} from "react-icons/sl"

import Image, { StaticImageData } from "next/image"

import JenisPengeluaranIcon from "@/assets/icons/jenis_pengeluaran.png"
import SumberDanaIcon from "@/assets/icons/sumber_dana.png"
import SellerIcon from "@/assets/icons/seller.png"
import { PageContainer } from "@/components/ui"

import colors from "@/components/colors"

function PageTitle() {
    return (
        <Box
            position="fixed"
            sx={{
                backgroundColor: colors.neutral,
                height: 40,
                width: "100%",
                zIndex: 2,
                padding: 1,
            }}
        >
            <Typography
                level="h4"
                textAlign="center"
                sx={{
                    color: colors.primary
                }}
            >
                Pengaturan
            </Typography>
        </Box>
    )
}

const SettingItem = ({
    title,
    subtitle,
    image,
    link,
}: {
    title: string,
    subtitle: string,
    image: StaticImageData
    link: string,
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
                    <Typography
                        lineHeight="md"
                        fontSize="lg"
                        textColor={colors.neutral}
                    >
                        {title}
                    </Typography>
                    <Typography
                        lineHeight="sm"
                        fontSize="sm"
                        textColor={colors.secondary}
                    >
                        {subtitle}
                    </Typography>
                </Stack>
                <IconButton
                    variant="plain"
                    size="sm"
                    onClick={() => {
                        router.push(link)
                    }}
                >
                    <ContinueIcon size={20} color={colors.neutral} />
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default function Pengaturan() {
    return (
        <>
            <PageTitle />
            <PageContainer
                rowGap={1}
                paddingTop={8}
            >
                <Typography
                    level="h5"
                    width="100%"
                    textColor={colors.secondary}
                >
                    Transaksi
                </Typography>
                <Stack
                    spacing={3}
                    width="100%"
                >
                    <SettingItem
                        title="Kategori Pengeluaran"
                        subtitle="Pengeluaran transaksi diorganisir dan dikelompokkan berdasarkan kategori tertentu."
                        image={JenisPengeluaranIcon}
                        link="/pengaturan/kategori-pengeluaran"
                    />
                    <SettingItem
                        title="Sumber Dana"
                        subtitle="Tentukan sumber dana pembayaran transaksi Anda."
                        image={SumberDanaIcon}
                        link="/pengaturan/sumber-dana"
                    />
                    <SettingItem
                        title="Penjual"
                        subtitle="Penjual adalah orang atau entitas yang Anda melakukan transaksi pembelian dengan mereka."
                        image={SellerIcon}
                        link="/pengaturan/penjual"
                    />
                </Stack>
                <Typography
                    level="h5"
                    width="100%"
                    textColor={colors.secondary}
                >
                    Umum
                </Typography>
                <Stack
                    spacing={3}
                    width="100%"
                >
                    <SettingItem
                        title="Akun"
                        subtitle="Manajemen akun Anda"
                        image={JenisPengeluaranIcon}
                        link="/pengaturan/akun"
                    />
                </Stack>
            </PageContainer>
        </>
    )
}
