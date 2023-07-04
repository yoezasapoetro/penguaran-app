import {
    Button,
    Box,
    Modal,
    ModalDialog,
    colors,
} from "@mui/joy"

export default function ConfirmationModal(props: {
    open: boolean
    onCancel: () => void
    onConfirm: () => void
    cancelText: string
    confirmText: string
    children: React.ReactNode
}) {
    return (
        <Modal
            open={props.open}
            onClose={props.onCancel}
        >
            <ModalDialog
                sx={(theme) => ({
                    [theme.breakpoints.only("xs")]: {
                        top: "unset",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 0,
                        transform: "none",
                        maxWidth: "unset",
                    }
                })}
            >
                {props.children}
                <Box
                    sx={{
                        my: 1,
                        display: "flex",
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row-reverse" },
                    }}
                >
                    <Button
                        variant="outlined"
                        color="neutral"
                        sx={{
                            fontSize: "md",
                            fontWeight: 400,
                            borderRadius: "3rem",
                            borderColor: colors.blue[900],
                            color: colors.blue[900],
                        }}
                        onClick={props.onCancel}
                    >
                        {props.cancelText}
                    </Button>
                    <Button
                        variant="solid"
                        color="primary"
                        sx={{
                            fontSize: "md",
                            fontWeight: 500,
                            borderRadius: "3rem",
                            backgroundColor: colors.blue[900],
                            color: colors.green[300],
                        }}
                        onClick={props.onConfirm}
                    >
                        {props.confirmText}
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

