import {
    Modal,
    modalClasses,
    Sheet,
} from "@mui/joy"

import colors from "../colors"

export type DrawerProps = {
    open: boolean
    onClose: () => void
    height?: number
    children: React.ReactNode
}

export default function BottomDrawer(props: DrawerProps) {
    const height = props.height ?? 80;
    const size = `clamp(30rem, ${height}%, 50rem)`
    return (
        <Modal
            keepMounted
            open={props.open}
            onClose={props.onClose}
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
                        backdropFilter: "blur(2px)",
                    }
                }
            }}
        >
            <Sheet
                sx={{
                    px: 2,
                    py: 1.5,
                    borderTopWidth: 1,
                    borderTopStyle: "solid",
                    borderTopColor: colors.accent,
                    backgroundColor: colors.background,
                    borderTopLeftRadius: "2rem",
                    borderTopRightRadius: "2rem",
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
                {props.children}
            </Sheet>
        </Modal>
    )
}
