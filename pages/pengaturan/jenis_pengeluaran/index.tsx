import * as React from "react"
import {
    Container,
    Stack,
    Button,
    Box,
    Typography,
    TypographyProps,
} from "@mui/joy"

import {
    SlPuzzle as IconImage
} from "react-icons/sl"

import colors from "@/components/colors"
import { IconType } from "react-icons/lib"

function PageHeader({
    title,
    subtitle,
    iconImage
}: {
    title: string,
    subtitle: string,
    iconImage: IconType
}) {

    const titleProps: TypographyProps = {
        level: "h5",
        lineHeight: "sm",
        textColor: colors.primary,
    }

    const subtitleProps: TypographyProps = {
        level: "h6",
        lineHeight: "sm",
        textColor: colors.neutral,
    }

    const icon = React.createElement(iconImage, {
        color: colors.neutral,
        size: 36,
    })

    return (
        <Stack
            useFlexGap
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            position="relative"
            sx={{
                backgroundColor: colors.accent,
                height: 70,
                padding: 2
            }}
        >
            <Stack>
                <Typography {...titleProps}>{title}</Typography>
                <Typography {...subtitleProps}>{subtitle}</Typography>
            </Stack>
            <Box
                position="absolute"
                right="1rem"
                top="1.5rem"
            >
                {icon}
            </Box>
        </Stack>
    )
}

function CreateButton() {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 80,
                left: 0,
                right: 0,
                margin: "0 1.5rem",
                borderRadius: "0",
                boxShadow: 5,
            }}
        >
            <Button
                fullWidth
                sx={{
                    backgroundColor: colors.primary,
                    borderRadius: "0",
                    color: colors.neutral
                }}
            >
                Buat Baru
            </Button>
        </Box>
    )
}

function PageLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Container
            fixed
            disableGutters
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                height: "100%",
                width: "100%",
                backgroundColor: colors.background,
                position: "relative",
            }}
        >
            <Stack height="100%">
                {children}
            </Stack>
        </Container>
    )
}

export default function JenisPengeluaran() {
    return (
        <PageLayout>
            <PageHeader
                title="Pengaturan"
                subtitle="Jenis Pengeluaran"
                iconImage={IconImage}
            />
            <CreateButton />
            <Stack
                useFlexGap
                height="100%"
            >
            </Stack>
        </PageLayout>
    )
}
