"use client"

import {
    Container,
    Spinner,
    Text,
    Stack
} from "@chakra-ui/react"

export default function Loading() {
    return (
        <Container>
            <Stack
                minH="100vh"
                spacing={1}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner
                    thickness="4px"
                    speed="0.75s"
                    emptyColor="green.50"
                    color="green.700"
                    size="lg"
                />
                <Text fontSize="sm">Membuka data...</Text>
            </Stack>
        </Container>
    )
}
