import { Alert, Typography } from "@mui/joy"
import {
    LuInfo as InfoIcon,
} from "react-icons/lu"

export default function InformationBanner(props: {
    title: string
    children: React.ReactNode
}) {
    return (
        <Alert
            variant="outlined"
            color="info"
            sx={{
                mx: "-0.5rem",
                alignItems: "flex-start",
            }}
            slotProps={{
                startDecorator: {
                    sx: {
                        marginTop: 0.25,
                    }
                }
            }}
            startDecorator={<InfoIcon size={22} />}
        >
            <div>
                <Typography
                    level="h6"
                    color="info"
                >
                    {props.title}
                </Typography>
                {props.children}
            </div>
        </Alert>
    )
}

