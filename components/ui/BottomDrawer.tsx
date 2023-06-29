import {
    Modal,
    modalClasses,
    Sheet,
} from "@mui/joy"

import colors from "../colors"

export type DrawerProps = {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function BottomDrawer({
    open,
    onClose,
    children
}: DrawerProps) {
    const size = "clamp(30rem, 80%, 50rem)"
    return (
        <Modal
            keepMounted
            open={open}
            onClose={onClose}
            sx={{
                transitionProperty: "visibility",
                transitionDelay: open ? "0s" : "300ms",
                [`& .${modalClasses.backdrop}`]: {
                    opacity: open ? 1 : 0,
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
                    transform: open ? "translateY(0)" : "translateY(100%)",
                    height: size,
                    width: "100vw",
                    boxShadow: "sm",
                    transition: "transform 0.3s ease",
                }}
            >
                {children}
            </Sheet>
        </Modal>
    )
}
