import * as React from "react"
import { useState, useEffect } from "react"
import {
    Stack,
    Input,
    Button,
    buttonClasses,
    Typography,
    InputProps,
    FormControl,
    FormLabel,
    FormHelperText,
    IconButton,
    Box,
} from "@mui/joy"
import {
    FormDateInput,
    FormInput,
    FormModalPicker,
    PageHeader,
    PageLayout,
} from "@/components/ui"
import { SxProps } from "@mui/joy/styles/types"
import {
    BsPlusLg as AddIcon,
    BsXLg as DeleteIcon,
} from "react-icons/bs"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
    FieldArray,
    FieldArrayRenderProps,
    Formik,
    FormikConfig,
    FormikProps,
    useField,
} from "formik"
import {
    object,
    number,
    date,
    array,
    string
} from "yup"
import dayjs from "dayjs"

import { KategoriPengeluaran } from "@/types/KategoriPengeluaran"
import { Penjual } from "@/types/Penjual"
import { SumberDana } from "@/types/SumberDana"
import { fetchKategoriPengeluaran } from "@/actions/kategoriPengeluaran"
import { fetchSumberDana } from "@/actions/sumberDana"
import { fetchPenjual } from "@/actions/penjual"
import { addExpense } from "@/actions/expense"
import { ExpensePayload } from "@/types/Expense"

const pickerInputSxProps: SxProps = {
    width: "100%",
    '--Input-radius': 0,
    '--Input-focusedThickness': 1,
}

function CategoryPicker(props: {
    label: string
    name: string
} & InputProps) {
    const [inputValue, setInputValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const [field, meta, helpers] = useField(props.name)

    useEffect(() => {
        if (field.value === 0) setInputValue("")
    }, [field])

    function handleChange(val: number) {
        helpers.setValue(val)
        const [_value] = result.filter(
            ({ id }) => (id === val)
        )
        setInputValue(_value.name || "")
    }

    const [page] = useState<number>(1)
    let result: Array<Partial<KategoriPengeluaran>> = []

    const { data, isSuccess } = useQuery({
        queryKey: ["kategoriPengeluaran", page],
        queryFn: () => fetchKategoriPengeluaran(page),
        enabled: open
    })

    if (isSuccess) {
        result = data.data
    }

    return (
        <>
            <FormControl error={Boolean(meta.touched && meta.error)}>
                <FormLabel>{props.label}</FormLabel>
                <input
                    type="hidden"
                    value={field.value}
                    name={field.name}
                />
                <Input
                    readOnly
                    sx={pickerInputSxProps}
                    onClick={() => setOpen(true)}
                    value={inputValue}
                    placeholder={props.placeholder}
                />
                {meta.error && meta.touched && <FormHelperText>
                    {meta.error}
                </FormHelperText>}
            </FormControl>

            <FormModalPicker
                modalTitle="Pilih kategori pengeluaran"
                open={open}
                setOpen={setOpen}
                selected={field.value}
                result={result}
                setSelected={handleChange}
            />
        </>
    )
}

function StorePicker(props: {
    label: string
    name: string
} & InputProps) {
    const [inputValue, setInputValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const [field, meta, helpers] = useField(props.name)

    useEffect(() => {
        if (field.value === 0) setInputValue("")
    }, [field])

    function handleChange(val: number) {
        helpers.setValue(val)
        const [_value] = result.filter(
            ({ id }) => (id === val)
        )
        setInputValue(_value?.name || "")
    }

    const [page] = useState<number>(1)
    let result: Array<Partial<Penjual>> = []

    const { data, isSuccess } = useQuery({
        queryKey: ["penjual", page],
        queryFn: () => fetchPenjual(page),
        enabled: open
    })

    if (isSuccess) {
        result = data.data
    }

    return (
        <>
            <FormControl error={Boolean(meta.touched && meta.error)}>
                <FormLabel>{props.label}</FormLabel>
                <input type="hidden" value={field.value} name={field.name} />
                <Input
                    onClick={() => setOpen(true)}
                    value={inputValue}
                    placeholder={props.placeholder}
                    readOnly
                    sx={pickerInputSxProps}
                />
                {meta.error && meta.touched && <FormHelperText>
                    {meta.error}
                </FormHelperText>}
            </FormControl>

            <FormModalPicker
                modalTitle="Pilih penjual atau entitas"
                open={open}
                setOpen={setOpen}
                result={result}
                selected={field.value}
                setSelected={handleChange}
            />
        </>
    )
}

function SourcePaymentPicker(props: {
    label: string
    name: string
} & InputProps) {
    const [inputValue, setInputValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const [field, meta, helpers] = useField(props.name)

    useEffect(() => {
        if (field.value === 0) setInputValue("")
    }, [field])

    function handleChange(val: number) {
        helpers.setValue(val)
        const [_value] = result.filter(
            ({ id }) => (id === val)
        )
        setInputValue(_value?.name || "")
    }

    const [page] = useState<number>(1)
    let result: Array<Partial<SumberDana>> = []

    const { data, isSuccess } = useQuery({
        queryKey: ["sumberDana", page],
        queryFn: () => fetchSumberDana(page),
        enabled: open
    })

    if (isSuccess) {
        result = data.data
    }

    return (
        <>
            <FormControl error={Boolean(meta.touched && meta.error)}>
                <FormLabel>{props.label}</FormLabel>
                <input type="hidden" value={field.value} name={field.name} />
                <Input
                    onClick={() => setOpen(true)}
                    value={inputValue}
                    placeholder={props.placeholder}
                    readOnly
                    sx={pickerInputSxProps}
                />
                {meta.error && meta.touched && <FormHelperText>
                    {meta.error}
                </FormHelperText>}
            </FormControl>

            <FormModalPicker
                modalTitle="Pilih sumber dana"
                open={open}
                setOpen={setOpen}
                result={result}
                selected={field.value}
                setSelected={handleChange}
            />
        </>
    )
}

function EntriPengeluaranForm() {
    const mutation = useMutation({
        mutationKey: ["entriPengeluaran"],
        mutationFn: addExpense,
    })

    const dateInstance = dayjs();
    const currentDate = dateInstance.toDate();
    const min = dateInstance.startOf("month").toDate();

    const expenseDetailSchema = object({
        detail: string()
            .ensure(),
        amount: number()
            .positive()
            .moreThan(0, "Total tidak boleh 0")
    })

    const formikConfig: FormikConfig<ExpensePayload> = {
        initialValues: {
            categoryId: 0,
            storeId: 0,
            sourcePaymentId: 0,
            expenseDate: "",
            total: 0,
            details: [],
        },
        validationSchema: object({
            categoryId: number()
                .required()
                .positive()
                .moreThan(0, "Pilih kategori pengeluaran"),
            storeId: number()
                .required()
                .positive()
                .moreThan(0, "Pilih penjual atau entitas"),
            sourcePaymentId: number()
                .required()
                .positive()
                .moreThan(0, "Pilih sumber dana"),
            expenseDate: date()
                .required("Pilih tanggal pengeluaran")
                .min(min, "Tanggal pengeluaran minimum mulai dari tanggal 1 tiap bulannya.")
                .max(currentDate, "Tanggal pengeluaran maksimum hanya untuk hari ini."),
            total: number()
                .required()
                .positive()
                .moreThan(0, "Masukkan total pengeluaran"),
            details: array()
                .of(expenseDetailSchema)
                .optional()
        }),
        onSubmit: (values, actions) => {
            mutation.mutate(values)
            actions.resetForm()
            actions.setSubmitting(false)
        }
    }
    return (
        <>
            <Formik {...formikConfig}>
                {(props: FormikProps<ExpensePayload>) => (
                    <form
                        onSubmit={props.handleSubmit}
                        style={{
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
                            <MainForm></MainForm>
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
                        <Button
                            fullWidth
                            disabled={props.isSubmitting}
                            type="submit"
                            sx={{
                                borderRadius: 0,
                                boxShadow: "sm",
                                color: "success.500",
                                bgcolor: "primary.900",
                                [`&.${buttonClasses.disabled}`]: {
                                    backgroundColor: "primary.50",
                                    color: "success.500",
                                },
                            }}
                        >
                            Simpan
                        </Button>
                    </form>
                )}
            </Formik>
        </>
    )
}

export function FieldsetForm(props: {
    children: React.ReactNode
    sx?: SxProps
}) {
    return (
        <Stack
            useFlexGap
            component="fieldset"
            sx={{
                height: "100%",
                marginInline: 0,
                paddingBlock: 0,
                paddingInline: 0,
                borderWidth: 0,
                width: "100%",
                rowGap: "0.5rem",
                ...props.sx,
            }}
        >
            {props.children}
        </Stack>
    )
}

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

export default function EntriPengeluaran() {
    return (
        <>
            <PageHeader
                title="Pengeluaran"
                subtitle="Entri pengeluaran"
                backUrl="/pengeluaran"
            />
            <PageLayout>
                <EntriPengeluaranForm />
            </PageLayout>
        </>
    )
}
