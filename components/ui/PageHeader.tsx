import {
    Stack,
    Typography,
    TypographyProps,
    IconButton,
} from "@mui/joy"

import {
    IoIosArrowBack as BackIcon
} from "react-icons/io"

import colors from "../colors"
import { useRouter } from "next/router"

export default function PageHeader(props: {
    title: string
    subtitle: string
    backUrl: string
}) {
    const router = useRouter()
    const back = () => router.replace(props.backUrl)

    const titleProps: TypographyProps = {
        fontSize: 24,
        level: "h4",
        lineHeight: "sm",
        width: "100%",
        textColor: colors.primary,
    }

    const subtitleProps: TypographyProps = {
        width: "100%",
        lineHeight: "sm",
        fontSize: 18,
        gutterBottom: true,
        textColor: colors.accent,
    }

    return (
        <Stack
            useFlexGap
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={1}
            sx={{
                backgroundColor: colors.neutral,
                height: 70,
                pt: 2,
                pb: 3,
            }}
        >
            <IconButton
                variant="plain"
                onClick={back}
            >
                <BackIcon color={colors.background} size={24} />
            </IconButton>
            <Stack
                width="100%"
            >
                <Typography {...titleProps}>{props.title}</Typography>
                <Typography {...subtitleProps}>{props.subtitle}</Typography>
            </Stack>
        </Stack>
    )
}

