import {
    Box,
    Typography,
} from "@mui/joy"

import colors from "../colors"

export default function PageTitle(props: {
    title: string
}) {
    return (
        <Box
            position="fixed"
            sx={{
                backgroundColor: colors.secondary,
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
                {props.title}
            </Typography>
        </Box>
    )
}


