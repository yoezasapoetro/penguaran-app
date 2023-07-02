import { Stack, Typography } from "@mui/joy"
import {
    LuInfo as InfoIcon,
} from "react-icons/lu"

import colors from "../colors"

export default function LogDate(props: {
    date: string
}) {
    return (
        <Stack
            useFlexGap
            direction="row"
            alignItems="center"
            spacing={0.7}
        >
            <InfoIcon color={colors.secondary} size={15} />
            <Typography
                lineHeight="sm"
                fontSize={13}
                textColor={colors.secondary}
            >
                {props.date}
            </Typography>
        </Stack>
    )
}

