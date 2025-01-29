import * as React from "react"
import { useRef, useState } from "react"
import {
    IconButton,
    Box,
    Typography,
    Menu,
    MenuItem,
    ListItemDecorator,
    colors,
} from "@mui/joy"

import { Trash2Icon, PencilIcon, MoreVerticalIcon } from "components/icons"

export default function ActionButton(props: {
    disableEdit?: boolean
    onEdit: (data: any) => void
    onDelete: (data: any) => void
}) {
    const buttonRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const actionProps = {
        textColor: colors.blue[900],
        lineHeight: "sm",
    }

    const actionIconProps = {
        size: 15,
        color: colors.blue[900],
    }

    const editActionProps = {
        ...actionProps,
        ...(props.disableEdit ? {
            textColor: "var(--joy-palette-neutral-plainDisabledColor)"
        } : {}),
    }

    const editActionIconProps = {
        ...actionIconProps,
        ...(props.disableEdit ? {
            color: "var(--joy-palette-neutral-plainDisabledColor)"
        } : {}),
    }

    const _id = 'action-button-' + React.useId()

    return (
        <Box>
            <IconButton
                ref={buttonRef}
                id={_id}
                aria-controls={_id}
                aria-haspopup="true"
                aria-expanded={open ? true : undefined}
                variant="plain"
                color="neutral"
                sx={{
                    padding: 0,
                    minWidth: "2rem",
                    paddingInline: 0,
                }}
                onClick={() => {
                    setOpen(!open)
                }}
            >
                <MoreVerticalIcon size={20} color={colors.blue[900]} />
            </IconButton>
            <Menu
                id={_id}
                anchorEl={buttonRef.current}
                open={open}
                onClose={handleClose}
                aria-labelledby={_id}
                placement="bottom-end"
                size="sm"
                keepMounted={true}
                disablePortal={true}
                sx={{
                    boxShadow: "sm",
                }}
            >
                <MenuItem
                    onClick={props.onEdit}
                    disabled={props.disableEdit}
                >
                    <ListItemDecorator
                        sx={{
                            padding: 0,
                            minWidth: "2rem",
                            paddingInline: 0,
                        }}
                    >
                        <PencilIcon {...editActionIconProps} />
                    </ListItemDecorator>
                    <Typography {...editActionProps}>
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem onClick={props.onDelete}>
                    <ListItemDecorator
                        sx={{
                            padding: 0,
                            minWidth: "2rem",
                            paddingInline: 0,
                        }}
                    >
                        <Trash2Icon {...actionIconProps} />
                    </ListItemDecorator>
                    <Typography {...actionProps}>
                        Hapus
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

