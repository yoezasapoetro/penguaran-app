import { Text } from "@chakra-ui/react"

export default function TextHeading({ children }: {
    children: React.ReactNode,
}) {
    return <Text fontSize="xl">{children}</Text>
}

