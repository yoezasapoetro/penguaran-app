import {
    IconButton,
    Stack,
    Typography,
    colors
} from "@mui/joy"
import { SxProps } from "@mui/joy/styles/types"

import BottomDrawer from "./BottomDrawer"
import { CloseIcon } from "components/icons"

export type ModalFormProps = {
    modalTitle: string
    open: boolean
    setOpen: (open: boolean) => void
}

export default function ModalForm(props: ModalFormProps & {
    children: React.ReactNode
    sx?: SxProps
}) {
    return (
        <BottomDrawer
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <Stack
                useFlexGap
                sx={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral.200",
                    py: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 3,
                    backgroundColor: "white",
                }}
            >
                <Typography
                    fontSize="lg"
                    fontWeight="md"
                    textColor="primary.900"
                >
                    {props.modalTitle}
                </Typography>
                <IconButton
                    variant="plain"
                    size="sm"
                    sx={{
                        margin: 0,
                        padding: 0,
                    }}
                    onClick={() => props.setOpen(false)}
                >
                    <CloseIcon size={23} color={colors.blue[900]} />
                </IconButton>
            </Stack>
            {props.children}
        </BottomDrawer>
    )
}
