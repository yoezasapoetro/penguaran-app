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
            variant="solid"
            color="neutral"
            sx={{
                alignItems: "flex-start",
            }}
            slotProps={{
                startDecorator: {
                    sx: {
                        marginTop: 0.25,
                    }
                }
            }}
            startDecorator={<InfoIcon size={20} />}
        >
            <div>
                <Typography
                    fontSize="md"
                    textColor="white"
                >
                    {props.title}
                </Typography>
                {props.children}
            </div>
        </Alert>
    )
}

