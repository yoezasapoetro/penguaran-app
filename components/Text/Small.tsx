"use client"

import { Text } from "@chakra-ui/react"

export default function TextSmall({ children }: {
    children: React.ReactNode, className?: string
}) {
    return <Text fontSize="xs">{children}</Text>
}
