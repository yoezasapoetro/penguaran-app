import { Text } from "@chakra-ui/react"

export default function TextSmall({ children }: {
    children: React.ReactNode,
}) {
    return <Text fontSize="xs">{children}</Text>
}
