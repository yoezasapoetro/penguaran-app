import { useRouter } from "next/navigation"

import {
    Typography,
    Stack,
    Box,
    Card,
    CardContent,
    AspectRatio,
    colors,
} from "@mui/joy"

import {
    SlArrowRight as ContinueIcon
} from "react-icons/sl"

import Image, { StaticImageData } from "next/image"

import JenisPengeluaranIcon from "@/assets/icons/jenis_pengeluaran.png"
import SumberDanaIcon from "@/assets/icons/sumber_dana.png"
import SellerIcon from "@/assets/icons/seller.png"
import { PageContainer, PageTitle } from "@/components/ui"

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
                borderColor: "neutral.outlinedBorder",
                borderStyle: "solid",
                borderWidth: 1,
                ['&:hover']: {
                    borderColor: "success.300",
                    cursor: "pointer",
                    boxShadow: "md",
                }
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
                        fontSize="md"
                        fontWeight="md"
                        textColor="primary.900"
                    >
                        {title}
                    </Typography>
                    <Typography
                        lineHeight="sm"
                        fontSize="xs"
                        textColor="text.tertiary"
                    >
                        {subtitle}
                    </Typography>
                </Stack>
                <Box>
                    <ContinueIcon size={20} color={colors.grey[500]} />
                </Box>
            </CardContent>
        </Card>
    )
}

export default function Pengaturan() {
    return (
        <>
            <PageTitle title="Pengaturan" />
            <PageContainer
                rowGap={1}
                paddingTop={8}
            >
                <Typography
                    fontSize="lg"
                    width="100%"
                    textColor="primary.900"
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
                        title="Penjual & Entitas"
                        subtitle="Penjual atau Entitas yang Anda melakukan transaksi pembelian dengan mereka."
                        image={SellerIcon}
                        link="/pengaturan/penjual"
                    />
                </Stack>
                <Typography
                    fontSize="lg"
                    width="100%"
                    textColor="primary.900"
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
