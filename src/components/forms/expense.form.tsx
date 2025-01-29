import { z } from "zod"
import { FieldArray, FieldArrayRenderProps, Formik, FormikConfig, FormikProps } from "formik";
import { useRouter } from "next/router";
import dayjs from "dayjs"
import { Box, Button, IconButton, Stack, Typography, buttonClasses } from "@mui/joy";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { FieldsetForm, FormDateInput, FormInput } from "components/ui";
import { CategoryPicker, SourcePaymentPicker, StorePicker } from "components/pickers"
import { trpc } from "api/utils/trpc";
import { ExpensePayload } from "types/Expense";
import { AddIcon, DeleteIcon } from "components/icons"

function MainForm() {
    return (
        <FieldsetForm>
            <CategoryPicker
                label="Kategori pengeluaran"
                name="categoryId"
                placeholder="Pilih kategori pengeluaran.."
            />
            <StorePicker
                label="Penjual atau Entitas"
                name="storeId"
                placeholder="Pilih penjual atau entitas.."
            />
            <SourcePaymentPicker
                label="Sumber dana"
                name="sourcePaymentId"
                placeholder="Pilih sumber dana.."
            />
            <FormDateInput
                label="Tanggal"
                placeholder="Pilih tanggal pengeluaran"
                name="expenseDate"
            />
            <FormInput
                label="Total transaksi"
                placeholder="Total bertransaksi dengan entitas"
                name="total"
                type="number"
                min={0}
                step={"0.01"}
            />
        </FieldsetForm>
    )
}

const expenseDetailSchema = z.object({
    detail: z.string(),
    amount: z.number()
        .positive()
        .gt(0, "Total tidak boleh 0")
}).required({
    detail: true
})

const formSchema = () => {
    const dateInstance = dayjs();
    const currentDate = dateInstance.toDate();
    const min = dateInstance.startOf("month").toDate();

    return toFormikValidationSchema(z.object({
        categoryId: z.number()
            .positive()
            .gt(0, "Pilih kategori pengeluaran"),
        storeId: z.number()
            .positive()
            .gt(0, "Pilih penjual atau entitas"),
        sourcePaymentId: z.number()
            .positive()
            .gt(0, "Pilih sumber dana"),
        expenseDate: z.date({
            required_error: "Pilih tanggal pengeluaran"
        })
            .min(min, "Tanggal pengeluaran minimum mulai dari tanggal 1 tiap bulannya.")
            .max(currentDate, "Tanggal pengeluaran maksimum hanya untuk hari ini."),
        total: z.number()
            .positive()
            .gt(0, "Masukkan total pengeluaran"),
        details: z.array(expenseDetailSchema)
            .optional()
    }).required({
        categoryId: true,
        storeId: true,
        sourcePaymentId: true,
        expenseDate: true,
        total: true
    }))
}

export default function ExpenseForm() {
    const router = useRouter()
    const mutation = trpc.expense.create.useMutation()

    const formikConfig: FormikConfig<ExpensePayload> = {
        initialValues: {
            categoryId: 0,
            storeId: 0,
            sourcePaymentId: 0,
            expenseDate: "",
            total: "0",
            details: [],
        },
        validationSchema: formSchema(),
        onSubmit: (values, actions) => {
            mutation.mutate(values)
            actions.resetForm()
            actions.setSubmitting(false)
            toast.success("Selamat, anda baru menambahkan data pengeluaran.", {
                description: "Kembali untuk melihat data.",
                action: {
                    label: "lihat",
                    onClick: () => router.push("/expense")
                },
            })
        },
    }

    return (
        <>
            <Formik {...formikConfig}>
                {(props: FormikProps<ExpensePayload>) => (
                    <form
                        onSubmit={props.handleSubmit}
                        style={{
                            marginTop: "4.5rem",
                            height: "100%",
                            display: "flex",
                            flex: "1 0 auto",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "1rem",
                            rowGap: "1rem",
                        }}
                    >
                        <Stack
                            useFlexGap
                            sx={{
                                flexDirection: "column",
                                height: "100%",
                                width: "100%",
                                rowGap: 3,
                            }}
                        >
                            <MainForm />
                            <FieldArray name="details">
                                {(detailsHelper: FieldArrayRenderProps) => {
                                    const details = props.values.details

                                    return (
                                        <Box>
                                            <Stack
                                                useFlexGap
                                                sx={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    marginBottom: 1,
                                                }}
                                            >
                                                <Typography fontWeight={500}>
                                                    Detil Pengeluaran
                                                </Typography>
                                                <IconButton
                                                    sx={{
                                                        borderRadius: "100px",
                                                        color: "primary.900",
                                                        backgroundColor: "success.300",
                                                        boxShadow: "md",
                                                    }}
                                                    onClick={() => {
                                                        detailsHelper.push({ detail: "", amount: 0 })
                                                    }}
                                                >
                                                    {<AddIcon size={21} />}
                                                </IconButton>
                                            </Stack>
                                            {Array.isArray(details) && <Stack
                                                useFlexGap
                                                sx={{
                                                    flexDirection: "column",
                                                    rowGap: 1,
                                                }}
                                            >
                                                {details.map((_, index) => (
                                                    <Stack
                                                        key={index}
                                                        useFlexGap
                                                        sx={{
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            columnGap: 2,
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <FieldsetForm
                                                            sx={{
                                                                padding: 1,
                                                                borderWidth: 1,
                                                                borderStyle: "dashed",
                                                                borderColor: "neutral.300",
                                                            }}
                                                        >
                                                            <FormInput
                                                                label="Detil Pengeluaran"
                                                                name={`details.${index}.detail`}
                                                                placeholder="Detil Pengeluaran"
                                                            />
                                                            <FormInput
                                                                label="Detil Jumlah Pengeluaran"
                                                                name={`details.${index}.amount`}
                                                                placeholder="Detil Jumlah Pengeluaran"
                                                                type="number"
                                                            />
                                                        </FieldsetForm>
                                                        <IconButton
                                                            size="sm"
                                                            sx={{
                                                                color: "primary.900",
                                                                borderRadius: "100px",
                                                                backgroundColor: "danger.300",
                                                            }}
                                                        >
                                                            <DeleteIcon
                                                                onClick={() => {
                                                                    detailsHelper.remove(index)
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Stack>
                                                ))}
                                            </Stack>}
                                        </Box>
                                    )
                                }}
                            </FieldArray>
                        </Stack>
                        <Box
                            sx={{
                                position: "relative",
                                height: "6rem",
                            }}
                        >
                            <Box sx={{
                                height: "inherit",
                                width: "100%",
                                background: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255))",
                                position: "fixed",
                                bottom: "calc(1rem + 40px)",
                                left: 0,
                                right: 0,
                            }} />
                            <Button
                                disabled={props.isSubmitting}
                                type="submit"
                                sx={{
                                    position: "fixed",
                                    bottom: "1rem",
                                    left: "1rem",
                                    right: "1rem",
                                    borderRadius: 0,
                                    boxShadow: "sm",
                                    color: "success.400",
                                    bgcolor: "primary.900",
                                    [`&.${buttonClasses.disabled}`]: {
                                        backgroundColor: "primary.50",
                                        color: "success.500",
                                    },
                                }}
                            >
                                Simpan
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

