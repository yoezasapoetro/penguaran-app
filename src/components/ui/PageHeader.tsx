import {
    Stack,
    Typography,
    TypographyProps,
    IconButton,
    colors,
} from "@mui/joy"

import {
    MdOutlineArrowBackIosNew as BackIcon
} from "react-icons/md"

import { useRouter } from "next/router"

export default function PageHeader(props: {
    title: string
    subtitle: string
    backUrl: string
}) {
    const router = useRouter()
    const back = () => router.replace(props.backUrl)

    const titleProps: TypographyProps = {
        fontSize: "md",
        level: "h4",
        lineHeight: "sm",
        width: "100%",
        textAlign: "center",
        textColor: "primary.900",
    }

    const subtitleProps: TypographyProps = {
        width: "100%",
        lineHeight: "sm",
        fontSize: "lg",
        textAlign: "center",
        textColor: "primary.900",
    }

    return (
        <Stack
            useFlexGap
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            maxWidth="sm"
            width="100%"
            sx={{
                position: "fixed",
                zIndex: 4,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                boxShadow: "sm",
                py: 2,
            }}
        >
            <IconButton
                variant="solid"
                sx={{
                    borderRadius: 100,
                    zIndex: 2,
                    ml: 2,
                    position: "absolute",
                    backgroundColor: colors.green[100],
                }}
                onClick={back}
            >
                <BackIcon color={colors.blue[900]} size={24} />
            </IconButton>
            <Stack
                width="100%"
                sx={{
                }}
            >
                <Typography {...titleProps}>{props.title}</Typography>
                <Typography {...subtitleProps}>{props.subtitle}</Typography>
            </Stack>
        </Stack>
    )
}

