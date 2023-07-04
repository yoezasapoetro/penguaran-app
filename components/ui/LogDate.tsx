import { Stack, Typography, colors } from "@mui/joy"
import {
    LuInfo as InfoIcon,
} from "react-icons/lu"

export default function LogDate(props: {
    date: string
}) {
    const color = colors.grey[400]

    return (
        <Stack
            useFlexGap
            direction="row"
            alignItems="center"
            spacing={0.7}
        >
            <InfoIcon color={color} size={14} />
            <Typography
                lineHeight="sm"
                fontSize="xs"
                textColor={color}
            >
                {props.date}
            </Typography>
        </Stack>
    )
}

