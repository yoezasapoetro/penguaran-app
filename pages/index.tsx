import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/joy"
import {
    SessionContextValue,
    useSession
} from "next-auth/react"
import { PieChart, Pie } from "recharts"
import { useRouter } from "next/router"

import { DashboardExpenseItem, DashboardExpenseItems, DashboardExpenseRatioItem } from "types/Dashboard"
import { PageContainer } from "components/ui"
import { trpc } from "api/utils/trpc"

function Greeting(props: {
    session: SessionContextValue<boolean>
}) {
    const { data } = props.session
    return (
        <Stack
            useFlexGap
            sx={{
                width: "100%",
                padding: "0.375rem 1rem",
                backgroundColor: "success.50",
                border: "1px solid",
                borderColor: "success.400",
                borderRadius: "0.5rem",
            }}
        >
            <Typography
                fontSize="lg"
                width="100%"
                textColor="primary.900"
            >
                Hi, {' '}
                {data?.user?.name}
            </Typography>
            <Typography
                width="100%"
                fontWeight={500}
                textColor="primary.900"
            >
                Selamat Datang!
            </Typography>
        </Stack>
    )
}

function EmptyDashboardData() {
    return (
        <Typography
            width="100%"
            textAlign="center"
            textColor="primary.900"
        >
            Tidak ada data..
        </Typography>
    )
}

function TodayExpense(props: {
    todayExpense: DashboardExpenseItem
}) {
    const todayExpense = props.todayExpense

    return (
        <Stack
            useFlexGap
        >
            <Typography>{todayExpense.categoryName}</Typography>
            <Typography>{todayExpense.storeName}</Typography>
            <Typography>{todayExpense.sourcePaymentName}</Typography>
            <Typography>{todayExpense.total}</Typography>
        </Stack>
    )
}

function ThisMonthExpenses(props: {
    thisMonthExpense: DashboardExpenseItems
}) {
    const router = useRouter()

    function redirectToExpense() {
        router.push("/expense")
    }

    return (
        <Stack
            useFlexGap
            rowGap={1}
        >
            {props.thisMonthExpense.map((item: DashboardExpenseItem, idx) => {
                return (
                    <TodayExpense
                        key={idx}
                        todayExpense={item}
                    />
                )
            })}
            <Box
                sx={{
                    margin: "-0.375rem -1rem",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        background: "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255))",
                        width: "100%",
                        height: "2rem",
                        position: "absolute",
                        top: "-2rem",
                    }}
                >
                </Box>
                <Button
                    fullWidth
                    onClick={redirectToExpense}
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                        borderTop: "1px solid",
                        borderTopColor: "primary.900",
                        border: "1px solid",
                        color: "primary.900",
                        bgcolor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        borderBottomColor: "transparent",

                        [`&:active`]: {
                            backgroundColor: "unset",
                        }
                    }}
                >
                    Tampilkan lebih banyak
                </Button>
            </Box>
        </Stack>
    )
}

type ExpenseRatioGroup = {
    name: string
    value: number
}

function ExpenseRatio(props: {
    expenseRatio: Array<DashboardExpenseRatioItem>
}) {
    const expenseRatioGroup = props.expenseRatio.reduce((acc: Array<ExpenseRatioGroup>, item: DashboardExpenseRatioItem) => {
        const find = acc.find((i) => i.name === item.sourceType)

        if (!find) {
            acc.push({
                name: item.sourceType,
                value: Number(item.total),
            })
        } else {
            find.value += Number(item.total)
            acc = acc.filter((i) => i.name !== item.sourceType)
            acc.push(find)
        }

        return acc
    }, [] as Array<ExpenseRatioGroup>)

    const expenseRatioSeries = props.expenseRatio.map((item: DashboardExpenseRatioItem) => {
        return {
            name: item.sourceName,
            value: Number(item.total),
        }
    }, [] as Array<ExpenseRatioGroup>)

    return (
        <PieChart
            width={200}
            height={200}
        >
            <Pie
                data={expenseRatioGroup}
                dataKey="value"
                cx="100"
                cy="100"
                outerRadius={40}
                fill="#8884d8"
            />
            <Pie
                data={expenseRatioSeries}
                dataKey="value"
                cx="100"
                cy="100"
                innerRadius={50}
                outerRadius={70}
                fill="#82ca9d"
                label
            />
        </PieChart>
    )
}

export default function Home() {
    const session = useSession()

    const { data, isSuccess } = trpc.dashboard.analytics.useQuery()

    let todayExpense: DashboardExpenseItem | null = null
    let thisMonthExpense: DashboardExpenseItems = []
    let expenseRatio: Array<DashboardExpenseRatioItem> = []

    if (isSuccess) {
        expenseRatio = data.data.expenseRatio
        thisMonthExpense = data.data.thisMonthExpense
        todayExpense = data.data.todayExpense
    }

    return (
        <PageContainer
            rowGap={2}
            margin={2}
        >
            <Greeting session={session} />

            <Typography
                width="100%"
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Pengeluaran Hari Ini
            </Typography>
            <Stack
                sx={{
                    width: "100%",
                    padding: "0.375rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral.400",
                    borderRadius: "0.5rem",
                    boxShadow: "sm",
                }}
            >
                {!!todayExpense
                    ? <TodayExpense todayExpense={todayExpense}></TodayExpense>
                    : <EmptyDashboardData />}
            </Stack>
            <Typography
                width="100%"
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Pengeluaran Bulan Ini
            </Typography>
            <Stack
                width="100%"
                sx={{
                    width: "100%",
                    padding: "0.375rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral.400",
                    borderRadius: "0.5rem",
                    boxShadow: "sm",
                    rowGap: 1,
                }}
            >
                {!!thisMonthExpense && thisMonthExpense.length > 0
                    ? <ThisMonthExpenses thisMonthExpense={thisMonthExpense}></ThisMonthExpenses>
                    : <EmptyDashboardData />}
            </Stack>
            <Typography
                width="100%"
                fontSize="lg"
                fontWeight={500}
                textColor="primary.900"
            >
                Ratio Pengeluaran Bulan Ini
            </Typography>
            <Stack
                width="100%"
                useFlexGap
                sx={{
                    width: "100%",
                    padding: "0.375rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral.400",
                    borderRadius: "0.5rem",
                    boxShadow: "sm",
                    alignItems: "center",
                }}
            >
                {!!expenseRatio && expenseRatio.length > 0
                    ? <ExpenseRatio expenseRatio={expenseRatio}></ExpenseRatio>
                    : <EmptyDashboardData />}
            </Stack>
        </PageContainer >
    )
}
