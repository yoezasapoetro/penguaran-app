import { intlFormatDistance, isEqual, isAfter, parseJSON } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import useSWR from "swr";
import { useState } from "react";
import { getCsrfToken } from "next-auth/react";
import {
    Container,
    Stack,
    Text,
    Card,
    CardBody,
    Box,
    HStack,
    Icon,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    useDisclosure
} from "@chakra-ui/react"
import {
    Trash2Icon,
    CalendarDaysIcon,
    BanIcon,
    PlusIcon,
    SaveIcon,
    InfoIcon
} from "lucide-react"

import PageHeader from "@/components/header"
import PageLoading from "@/components/loading"
import PageLayout from "@/components/page-layout"

type Category = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

type ResponseData = {
    data: Category[],
    total: number
}

type ErrorResponse = {
    status: string
    message: string
}

type AddCategoryProps = { name: string, csrfToken: string }

// @ts-ignore
const fetcher = (...args: any) => fetch(...args)
    .then((res) => res.json())

const addCategory = async ({ name, csrfToken }: AddCategoryProps) => {
    return await fetch("/api/category/form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify({
            name
        })
    }).then((res) => res.json())
}

function CategoryForm({ callback, csrfToken }: { callback: () => void, csrfToken: string }) {
    const [input, setInput] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

    const isError = input === ""

    return (
        <Card
            variant="outline"
            size="sm"
        >
            <CardBody>
                <FormControl isInvalid={isError}>
                    <Stack>
                        <Input
                            size="sm"
                            placeholder="Jenis pengeluaran yang dibutuhkan."
                            value={input}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage fontSize="xs" mt={-2}>
                            {isError ? "Jenis pengeluaran tidak boleh kosong" : ""}
                        </FormErrorMessage>
                        <Button
                            leftIcon={<SaveIcon size={15} />}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (!isError) {
                                    addCategory({ name: input, csrfToken }).then(callback)
                                }
                            }}
                        >
                            Simpan
                        </Button>
                    </Stack>
                </FormControl>
            </CardBody>
        </Card>
    )
}

const formatLogDate = (createdAt: string, updatedAt: string) => {
    const createdDate = parseJSON(createdAt)
    const updatedDate = parseJSON(updatedAt)
    let newDate: Date = createdDate
    let stringDateType = "dibuat"


    if (isEqual(createdDate, updatedDate)) {
        newDate = createdDate
    } else if (isAfter(updatedDate, createdDate)) {
        stringDateType = "terakhir diubah"
        newDate = updatedDate
    }

    const zoneDate = utcToZonedTime(newDate, "Asia/Jakarta")
    return `${stringDateType} ${intlFormatDistance(zoneDate, new Date(), { locale: 'id' })}`
}

async function removeCategory(id: number) {
    console.error('TODO remove category ', id)
}

function CategoryItem({ category, removeCategory }: { category: Category, removeCategory: (id: number) => void }) {
    return (
        <>
            <Card
                size="sm"
                borderColor="#7aadd5"
                borderRadius="xl"
                variant="outline"
                px={3}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    spacing={1}
                    py={2}
                >
                    <Text
                        fontSize="md"
                        lineHeight={1}
                    >
                        {category.name}
                    </Text>
                    <HStack alignItems="center" spacing={1}>
                        <Icon as={CalendarDaysIcon} color="gray.500" size={10} />
                        <Text
                            fontSize="xs"
                            color="gray.500"
                            lineHeight={1}
                        >
                            {formatLogDate(category.createdAt, category.updatedAt)}
                        </Text>
                    </HStack>
                </Stack>
                <IconButton
                    aria-label="Remove category"
                    bgColor="transparent"
                    icon={<Trash2Icon size={17} color="#7aadd5" />}
                    size="md"
                    onClick={() => removeCategory(category.id)}
                />
            </Card>
        </>
    )
}

function FormAlertInfo() {
    return (
        <Card
            variant="outline"
            backgroundColor="#fff"
            borderRadius="none"
            borderColor="#7aadd5"
            borderLeftWidth={0}
            borderRightWidth={0}
            size="sm"
        >
            <CardBody
                display="flex"
                alignItems="center"
                gap={2}
            >
                <Icon
                    as={InfoIcon}
                    height={6}
                    width={6}
                    color="#7aadd5"
                />
                <Text
                    textColor="#7aadd5"
                    fontSize="sm"
                    lineHeight="22px"
                >
                    Jenis pengeluaran tidak perlu dikelompokkan dalam periode tertentu (misalnya hari, minggu, bulan).
                    Sistem otomatis melakukan pengelompokan berdasarkan periode tersebut.
                </Text>
            </CardBody>
        </Card>
    )
}

export const getServerSideProps = async (context: any) => {
    const _csrfToken = await getCsrfToken(context)
    const csrfToken = _csrfToken || ""

    return {
        props: { csrfToken }
    }
}

export default function JenisPengeluaran({
    csrfToken
}: { csrfToken: string }) {
    const [formOpen, setFormOpen] = useState<Boolean>(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isLoading, mutate } = useSWR<ResponseData, ErrorResponse>(
        "/api/category", fetcher
    )

    if (isLoading) return <PageLoading />

    return (
        <Container
            p={0}
            minH="100vh"
            position="relative"
        >
            <Box>
                <PageHeader
                    title="Pengaturan"
                    subtitle="Jenis Pengeluaran"
                />
            </Box>

            <FormAlertInfo />

            <PageLayout>
                <Stack
                    width="100%"
                    spacing={2}
                >
                    {data?.data?.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            removeCategory={async (id: number) => {
                                removeCategory(id)
                            }}
                        />
                    ))}
                </Stack>
                {isOpen && (
                    <Drawer
                        placement="bottom"
                        isOpen={isOpen}
                        onClose={onClose}
                        size="lg"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody>
                                <CategoryForm csrfToken={csrfToken} callback={() => {
                                    setFormOpen(!formOpen)
                                    mutate()
                                }} />
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                )}
            </PageLayout>

            <Button
                leftIcon={<PlusIcon size={20} />}
                iconSpacing={1}
                variant="solid"
                bgColor="#7aadd5"
                width="100%"
                size="lg"
                borderRadius="none"
                onClick={onOpen}
                position="absolute"
                bottom={3}
                zIndex={2}
                color="white"
            >
                {formOpen ? "Batal" : "Tambah"}
            </Button>
        </Container>
    )
}
