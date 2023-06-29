import { Box, CircularProgress } from "@mui/joy"

export default function Loading() {
    return (
        <Box
            sx={{
                position: "absolute",
                inset: "45% 48%",
                zIndex: 3,
            }}
        >
            <CircularProgress
                variant="soft"
                value={33}
            />
        </Box>
    )
}

