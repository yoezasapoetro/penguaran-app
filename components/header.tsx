import {
    Heading,
    Text,
    Stack,
    HStack,
    Divider,
    Icon,
} from "@chakra-ui/react"
import {
    ArrowLeftIcon as BackIcon
} from "lucide-react"

import { Link } from "@chakra-ui/next-js"

type AppHeaderProps = {
    title: string
    subtitle?: string | null
    rootUrl?: string
}

export default function AppHeader({
    title,
    subtitle = null,
    rootUrl = ""
}: AppHeaderProps) {
    return (
        <HStack
            alignItems="center"
            justifyContent="flex-start"
            gap={1}
            m={2}
            py={1}
            borderColor="#c1d8eb"
            borderWidth={1}
            borderRadius="2xl"
            bgColor="#EBFFF9"
        >
            <Link
                href={rootUrl}
                height="100%"
                width="3rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Icon
                    as={BackIcon}
                    width="1.5rem"
                    height="100%"
                    color="#0a151f"
                />
            </Link>
            <Stack
                gap={0}
                width="100%"
            >
                <Heading
                    fontSize="xl"
                    lineHeight="27px"
                    color="#0a151f"
                >
                    {title}
                </Heading>
                {subtitle && <Text
                    fontSize="md"
                    lineHeight="22px"
                    color="#0a151f"
                >
                    {subtitle}
                </Text>}
            </Stack>
        </HStack>
    )
}

