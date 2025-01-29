import * as React from "react"
import {
    Stack,
    IconButton,
    Box,
    colors,
} from "@mui/joy"
import { NextRouter, useRouter } from "next/router"
import type { IconType } from "react-icons"

import { HomeIcon, ExpenseIcon, SettingsIcon } from "components/icons"

function isActive(route: string, routerPath: NextRouter): boolean {
    return route === routerPath.route
}

function NavButton(props: {
    router: NextRouter,
    to: string
    icon: IconType,
    action: () => void
}) {
    const IconSet = props.icon
    const isActiveMenu = isActive(props.to, props.router)
    const iconProps = {
        size: 32,
        color: !isActiveMenu ? colors.blue[900] : "white",
    }

    return (
        <IconButton
            onClick={props.action}
            size="lg"
            variant="plain"
            sx={{
                position: "relative",
                paddingTop: "0.5rem"
            }}
        >
            {isActiveMenu && <Box
                sx={{
                    width: 30,
                    height: 5,
                    borderBottomLeftRadius: "50rem",
                    borderBottomRightRadius: "50rem",
                    position: "absolute",
                    bgcolor: "common.white",
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
            position="fixed"
            bottom={0}
            paddingBottom={1}
            width="100%"
            maxWidth="sm"
            zIndex={2}
            sx={{
                bgcolor: colors.green[300],
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
                action={() => router.replace("/expense")}
                router={router}
                to="/pengeluaran"
                icon={ExpenseIcon}
            />
            <NavButton
                action={() => router.replace("/settings")}
                router={router}
                to="/pengaturan"
                icon={SettingsIcon}
            />
        </Stack>
    )
}
