import {
    Heading,
    Text,
    Stack,
} from "@chakra-ui/react"

type AppHeaderProps = {
    title: string
    subtitle?: string | null
}

export default function AppHeader({ title, subtitle = null }: AppHeaderProps) {
    return (
        <Stack
            p={4}
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            gap={0}
        >
            <Heading fontSize="2xl">{title}</Heading>
            {subtitle && <Text fontSize="md">{subtitle}</Text>}
        </Stack>
    )
}

