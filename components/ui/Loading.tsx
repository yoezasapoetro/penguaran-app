import { Box, CircularProgress } from "@mui/joy"

export default function Loading() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(1px)",
                zIndex: 99,
                transition: "transform 0.2s ease",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: "45% 48%",
                }}
            >
                <CircularProgress
                    variant="soft"
                    value={33}
                />
            </Box>
        </Box>
    )
}

