import { Box, Button, colors } from "@mui/joy"

export default function CreateButton(props: {
    onClick: () => void
}) {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 20,
                left: 0,
                right: 0,
                margin: "0 1.5rem",
                borderRadius: "0",
                zIndex: 3,
                boxShadow: 5,
            }}
        >
            <Button
                fullWidth
                size="lg"
                onClick={props.onClick}
                sx={{
                    fontWeight: 400,
                    backgroundColor: "primary.900",
                    borderRadius: "0",
                    color: colors.green[300],
                    boxShadow: "md",
                }}
            >
                Buat Baru
            </Button>
        </Box>
    )
}

