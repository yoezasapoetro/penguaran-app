import * as React from "react"
import { useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/id"
import {
    Box,
    Typography,
    IconButton,
    colors,
    Stack,
    Select,
    Option,
    selectClasses,
    Grid,
    CircularProgress,
} from "@mui/joy"
import { useRouter } from "next/router"

import { PageTitle, PageContainer } from "components/ui"
import { IndicatorIcon, AddIcon, CalendarIcon, PlaceIcon, MoneyIcon } from "components/icons"
import { ExpenseGroupItem, ExpenseResults } from "types/Expense"
import { trpc } from "api/utils/trpc"

function TimelinePicker(props: {
    month: number
    setMonth: (month: number) => void
}) {
    function handleChange(_: any, value: number | null) {
        props.setMonth(value || 0)
    }

    const monthLists = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    return (
        <Stack
            useFlexGap
            marginTop="2rem"
            width="fit-content"
        >
            <Select
                defaultValue={props.month}
                onChange={handleChange}
                name="timelinePickerMonth"
                value={props.month}
                variant="plain"
                indicator={<IndicatorIcon />}
                slotProps={{
                    listbox: {
                        sx: {
                            zIndex: 69,
                            color: colors.blue[900],
                        }
                    }
                }}
                sx={{
                    [`&.${selectClasses.root}`]: {
                        color: colors.blue[900],
                        width: "50vw",
                        justifyContent: "center",

                        [`&.${selectClasses.root}:hover`]: {
                            color: colors.blue[900],
                            backgroundColor: "transparent",
                        }
                    },
                    [`& .${selectClasses.button}`]: {
                        fontWeight: 500,
                        flex: "unset",
                    },
                    [`& .${selectClasses.indicator}`]: {
                        color: colors.blue[900],
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                        }
                    },
                }}
            >
                {monthLists.map((item, idx) =>
                    <Option
                        key={idx}
                        value={idx}
                        label={item}
                        variant="plain"
                    >
                        {item}
                    </Option>
                )}
            </Select>
        </Stack>
    )
}

function FabButton(props: {
    onClick: () => void
}) {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "4.5rem",
                transform: "translate(calc(50vw - 50%), 0%)",
                zIndex: 3,
            }}
        >
            <IconButton
                onClick={props.onClick}
                size="lg"
                sx={{
                    backgroundColor: "primary.900",
                    borderRadius: "100px",
                    boxShadow: "xl",
                }}
                variant="solid"
            >
                <AddIcon size={30} color={colors.green[300]} />
            </IconButton>
        </Box>
    )
}

dayjs.extend(relativeTime)
dayjs.locale("id")

function humanDate(date: string) {
    return dayjs().to(dayjs(date))
}

function currencyFormat(total: string) {
    const amount = Number(total)
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount)
}

function Timeline(props: {
    month: number
}) {
    let results: ExpenseResults = []
    let totalPage: number = 0
    const [page] = useState<number>(1)

    const { data, isSuccess, isLoading } = trpc.dashboard.getAllByMonth.useQuery({
        currentMonth: props.month,
        currentPage: page
    })

    if (isSuccess) {
        results = data.data
        totalPage = data.total
    }

    return (
        <Box
            width="100%"
            maxWidth="sm"
            position="relative"
        >
            <Typography
                fontSize="lg"
                fontWeight="md"
                padding="0 1rem 1rem"
                textColor={colors.blue[900]}
            >
                Timeline Pengeluaran
            </Typography>

            <Stack
                useFlexGap
                sx={{
                    backgroundColor: "neutral.50",
                    padding: "1rem",
                    marginBottom: "5rem",
                    rowGap: 2,
                }}
            >
                {isLoading && (
                    <Box
                        sx={{
                            position: "absolute",
                            background: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(6px)",
                            height: "100%",
                            width: "100%",
                            margin: "-1rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            rowGap: 1,
                            zIndex: 3,
                        }}
                    >
                        <CircularProgress
                            color="success"
                        />
                        <Typography
                            textColor="success.900"
                        >
                            Memuat data
                        </Typography>
                    </Box>
                )}
                {isSuccess && totalPage > 0 && results.map((item: { dateGroup: string, expenses: Array<ExpenseGroupItem> }, idx) => (
                    <Grid
                        key={idx}
                        container
                    >
                        <Grid
                            xs={3}
                            sx={{
                                padding: "1rem 0",
                            }}
                        >
                            <CalendarIcon size={18} color={colors.blue[900]} />
                            <Typography
                                fontSize="sm"
                                textColor="primary.900"
                            >
                                {humanDate(item.dateGroup)}
                            </Typography>
                        </Grid>
                        <Grid
                            xs={9}
                        >
                            <Stack
                                useFlexGap
                                sx={{
                                    rowGap: 2,
                                }}
                            >
                                {item.expenses.map((expense, idx) => (
                                    <Stack
                                        key={idx}
                                        useFlexGap
                                        sx={(theme) => ({
                                            rowGap: 1,
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "background.body",
                                            borderRadius: `${theme.vars.radius.md}`,
                                            borderWidth: 1,
                                            borderStyle: "solid",
                                            borderColor: "neutral.300",
                                        })}
                                    >
                                        <Box>
                                            <Typography
                                                fontSize="sm"
                                                fontWeight={500}
                                                textColor="primary.900"
                                            >
                                                {expense.categoryName}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    columnGap: 1,
                                                    flexWrap: "wrap",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <PlaceIcon size={18} color={colors.blue[900]} />
                                                <Typography
                                                    fontSize="sm"
                                                    textColor="primary.900"
                                                >
                                                    {expense.storeName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Stack
                                            useFlexGap
                                            alignItems="flex-end"
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    columnGap: 1,
                                                    flexWrap: "wrap",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <MoneyIcon size={18} color={colors.green[400]} />
                                                <Typography
                                                    fontSize="sm"
                                                    textColor="success.600"
                                                >
                                                    {expense.sourcePaymentName}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                fontSize="md"
                                                fontWeight={500}
                                                textColor="primary.900"
                                            >
                                                {currencyFormat(expense.total)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                ))}
            </Stack>
        </Box>
    )
}

export default function Expenses() {
    const router = useRouter()

    const addPengeluaranCallback = () => {
        router.push("/expense/entry")
    }

    const currentDate = new Date()
    const [month, setMonth] = useState<number>(currentDate.getMonth())

    return (
        <>
            <PageTitle title="Pengeluaran"></PageTitle>
            <PageContainer
                paddingTop={3}
                padding={0}
                paddingBottom={7}
            >
                <TimelinePicker
                    month={month}
                    setMonth={setMonth}
                />
                <Timeline
                    month={month}
                />
            </PageContainer>
            <FabButton
                onClick={addPengeluaranCallback}
            />
        </>
    )
}
