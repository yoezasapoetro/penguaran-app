import {
    Box,
    Typography,
} from "@mui/joy"

export default function PageTitle(props: {
    title: string
}) {
    return (
        <Box
            position="fixed"
            maxWidth="sm"
            width="100%"
            sx={{
                backdropFilter: "blur(8px)",
                height: 40,
                width: "100%",
                zIndex: 2,
                py: 1,
                boxShadow: "sm",
            }}
        >
            <Typography
                fontSize="xl2"
                fontWeight={500}
                textAlign="center"
                textColor="primary.900"
            >
                {props.title}
            </Typography>
        </Box>
    )
}


