import * as React from "react"
import {
    Stack,
    IconButton,
    Box,
} from "@mui/joy"

import { NextRouter, useRouter } from "next/router"

import colors from "../colors"

import {
    LuHome as HomeIcon,
    LuSettings as SettingsIcon,
} from "react-icons/lu"

import type { IconType } from "react-icons"

function isActive(route: string, routerPath: NextRouter): boolean {
    return route === routerPath.route
}

function NavButton({
    router,
    to,
    icon,
    action
}: {
    router: NextRouter,
    to: string
    icon: IconType,
    action: () => void
}) {
    const IconSet = icon
    const isActiveMenu = isActive(to, router)
    const iconProps = {
        size: 32,
        strokeWidth: 2,
        color: !isActiveMenu ? "white" : colors.neutral,
    }

    return (
        <IconButton
            onClick={action}
            size="lg"
            variant="plain"
            sx={{
                position: "relative",
                paddingTop: "0.5rem"
            }}
        >
            {isActiveMenu && <Box
                sx={{
                    width: 20,
                    height: 4,
                    position: "absolute",
                    bgcolor: colors.neutral,
                    top: 0,
                }}
            />}
            <IconSet {...iconProps} />
        </IconButton>
    )
}

export default function BottomNavigation() {
    const router = useRouter()

    return (
        <Stack
            position="sticky"
            bottom={0}
            height={70}
            width="100%"
            maxWidth="sm"
            zIndex={2}
            sx={{
                bgcolor: colors.accent,
                paddding: "1rem",
                borderRadius: "1.5rem 1.5rem 0rem 0rem"
            }}
            useFlexGap
            direction="row"
            alignItems="center"
            justifyContent="space-around"
        >
            <NavButton
                action={() => router.replace("/")}
                router={router}
                to="/"
                icon={HomeIcon}
            />
            <NavButton
                action={() => router.replace("/pengaturan")}
                router={router}
                to="/pengaturan"
                icon={SettingsIcon}
            />
        </Stack>
    )
}
