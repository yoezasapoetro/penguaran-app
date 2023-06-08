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
    CardHeader,
    CardBody,
    HStack,
    Icon,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    IconButton,
    Divider,
} from "@chakra-ui/react"
import {
    InfoIcon,
    Trash2Icon,
    CalendarDaysIcon,
    BanIcon,
    PlusIcon,
    SaveIcon
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
            "X_CSRF_TOKEN": csrfToken
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
            <HStack
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    spacing={1}
                >
                    <Text
                        fontSize="md"
                        lineHeight={1}
                    >
                        {category.name}
                    </Text>
                    <HStack alignItems="center" spacing={2}>
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
                    colorScheme="gray"
                    icon={<Trash2Icon size={14} />}
                    size="xs"
                    onClick={() => removeCategory(category.id)}
                />
            </HStack>
            <Divider borderColor="gray.200" />
        </>
    )
}

export const getServerSideProps = async () => {
    const _csrfToken = await getCsrfToken()
    const csrfToken = _csrfToken || ""

    return {
        props: { csrfToken }
    }
}

export default function JenisPengeluaran({
    csrfToken
}: { csrfToken: string }) {
    const [formOpen, setFormOpen] = useState<Boolean>(false)
    const [removeWarn, setRemoveWarn] = useState<Boolean>(false)

    const { data, isLoading, mutate } = useSWR<ResponseData, ErrorResponse>(
        "/api/category", fetcher
    )

    if (isLoading) return <PageLoading />

    return (
        <Container p={0} minH="100vh">
            <PageHeader
                title="Pengaturan"
                subtitle="Jenis Pengeluaran"
            />
            <PageLayout>
                <Card
                    mt={1}
                    size="sm"
                    variant="outline"
                    borderColor="blue.400"
                    borderWidth="1px"
                    backgroundColor="blue.50"
                >
                    <CardBody>
                        <Stack spacing={1}>
                            <HStack
                                spacing={2}
                            >
                                <Icon as={InfoIcon} color="blue.500" />
                                <Text color="blue.500" lineHeight="20px" fontWeight="semibold">Info</Text>
                            </HStack>
                            <Text color="blue.400" fontSize="sm" lineHeight="20px">
                                Jenis pengeluaran tidak perlu dikelompokkan dalam periode tertentu (misalnya hari, minggu, bulan).
                                Sistem otomatis melakukan pengelompokan berdasarkan periode tersebut.
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>


                <Card
                    variant="elevated"
                    size="sm"
                >
                    <CardHeader
                        borderBottomWidth="1px"
                        borderBottomColor="gray.200"
                    >
                        <Text lineHeight="20px" textColor="green.700">
                            Jenis pengeluaran saat ini
                            {" "}
                            <strong>{data?.total}</strong>
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={2}>
                            {data?.data?.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    category={category}
                                    removeCategory={async (id: number) => {
                                        // removeCategory(id)
                                        console.error(id)
                                        setRemoveWarn(!removeWarn)
                                    }}
                                />
                            ))}
                            {formOpen && (
                                <CategoryForm csrfToken={csrfToken} callback={() => {
                                    setFormOpen(!formOpen)
                                    mutate()
                                }} />
                            )}
                            <Button
                                leftIcon={
                                    formOpen
                                        ? <BanIcon size={15} />
                                        : <PlusIcon size={15} />
                                }
                                iconSpacing={1}
                                variant="outline"
                                size="sm"
                                onClick={() => setFormOpen(!formOpen)}
                            >
                                {formOpen ? "Batal" : "Tambah"}
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>
            </PageLayout>
        </Container>
    )
}
