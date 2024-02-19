import {
    Modal,
    modalClasses,
    Sheet,
    Stack,
} from "@mui/joy"

export type DrawerProps = {
    open: boolean
    onClose: () => void
    height?: number
    backdropClick?: boolean
    children: React.ReactNode
}

export default function BottomDrawer(props: DrawerProps) {
    const height = props.height ?? 80
    const backdropClick = props.backdropClick ?? false
    const size = `clamp(30rem, ${height}%, 50rem)`

    function handleClose(_: any, reason: string) {
        if (
            (reason === "backdropClick" && backdropClick) ||
            reason === "closeClick"
        ) {
            props.onClose()
        }
    }

    return (
        <Modal
            keepMounted
            open={props.open}
            onClose={handleClose}
            sx={{
                transitionProperty: "visibility",
                transitionDelay: props.open ? "0s" : "300ms",
                [`& .${modalClasses.backdrop}`]: {
                    opacity: props.open ? 1 : 0,
                    transition: "opacity 0.3s ease"
                },
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(4px)",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                    }
                }
            }}
        >
            <Sheet
                sx={{
                    px: 2,
                    py: 1.5,
                    boxSizing: "border-box",
                    position: "fixed",
                    overflow: "auto",
                    bottom: 0,
                    transform: props.open ? "translateY(0)" : "translateY(100%)",
                    height: size,
                    width: "100vw",
                    boxShadow: "sm",
                    transition: "transform 0.3s ease",
                }}
            >
                <Stack
                    useFlexGap
                    sx={{
                        height: "100%",
                        width: "100%",
                        marginBottom: 3,
                    }}
                >
                    {props.children}
                </Stack>
            </Sheet>
        </Modal>
    )
}
