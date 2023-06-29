import { Box, Button } from "@mui/joy"

import colors from "../colors"

export default function CreateButton({
    onClick
}: {
    onClick: () => void
}) {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 85,
                left: 0,
                right: 0,
                margin: "0 1.5rem",
                borderRadius: "0",
                boxShadow: 5,
            }}
        >
            <Button
                fullWidth
                size="lg"
                onClick={onClick}
                sx={{
                    fontWeight: 500,
                    backgroundColor: colors.primary,
                    borderRadius: "0",
                    color: colors.neutral,
                    boxShadow: "md",
                }}
            >
                Buat Baru
            </Button>
        </Box>
    )
}

