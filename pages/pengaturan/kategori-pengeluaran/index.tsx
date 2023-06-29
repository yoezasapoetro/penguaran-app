import * as React from "react"
import { useState } from "react"
import {
    Stack,
    Button,
    Box,
    Typography,
    Alert,
    ListItemDecorator,
    ListItemContent,
    Option,
} from "@mui/joy"

import {
    LuInfo as InfoIcon,
} from "react-icons/lu"

import {
    MdFiberManualRecord as LowPriority,
    MdRadioButtonChecked as MediumPriority,
    MdFiberSmartRecord as HighPriority,
} from "react-icons/md"

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import {
    FormikHelpers,
    Form,
    FormikConfig,
    Formik
} from "formik"
import { string, number, object } from "yup"

import colors, { priorityColors } from "@/components/colors"
import {
    BottomDrawer,
    PageLayout,
    PageHeader,
    Loading,
    CreateButton,
    ActionButton,
    FormSelect,
    ConfirmationModal,
    DataWrapper,
} from "@/components/ui"
import { dataLogDate } from "@/lib/utils/date"
import { kategoriPengeluaranData, prioritasPengeluaranData } from "@/data"
import {
    KategoriPengeluaran,
    KategoriPengeluaranData,
    KategoriPengeluaranFormProps,
    PrioritasPengeluaranData
} from "@/types/KategoriPengeluaran"
import {
    addKategoriPengeluaran,
    editKategoriPengeluaran,
    fetchKategoriPengeluaran,
    removeKategoriPengeluaran
} from "@/actions/kategoriPengeluaran"

export function InformationBanner(props: {
    title: string
    children: React.ReactNode
}) {
    return (
        <Alert
            variant="outlined"
            color="info"
            sx={{
                mx: "-0.5rem",
                alignItems: "flex-start",
            }}
            slotProps={{
                startDecorator: {
                    sx: {
                        marginTop: 0.25,
                    }
                }
            }}
            startDecorator={<InfoIcon size={22} />}
        >
            <div>
                <Typography
                    level="h6"
                    color="info"
                >
                    {props.title}
                </Typography>
                {props.children}
            </div>
        </Alert>
    )
}

function KategoriPengeluaranModalForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: KategoriPengeluaranFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: Partial<KategoriPengeluaran>) => void
}) {
    const title: Record<string, string> = {
        edit: "Edit Kategori Pengeluaran",
        create: "Tambah Kategori Pengeluaran",
    }

    const isEdit = formMode === "edit"

    const formikConfig: FormikConfig<Partial<KategoriPengeluaran>> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            priority: formData.priority,
        },
        validationSchema: object({
            name: string().required("Nama tidak boleh kosong."),
            priority: number()
                .min(0, "Level prioritas lebih dari 0")
                .max(3, "Level prioritas kurang atau sama dengan 3")
                .required("Prioritas tidak boleh kosong")
        }),
        onSubmit: (data: any, action: FormikHelpers<any>) => {
            submission({
                name: data.name,
                priority: data.priority,
                ...(isEdit ? { id: formData.id } : {})
            })
            action.setSubmitting(false)
            action.resetForm()
        },
    }

    return (
        <BottomDrawer
            open={isOpen}
            onClose={onClose}
        >
            <Stack
                sx={{
                    paddingInline: 2,
                }}
                spacing={2}
            >
                <Typography
                    fontSize="lg"
                    textColor={colors.neutral}
                    width="100%"
                    textAlign="center"
                >
                    {formMode && title[formMode]}
                </Typography>

                <Formik
                    {...formikConfig}
                >
                    {() => (
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "100%",
                                rowGap: "1rem",
                                flex: "1",
                            }}
                        >
                            <FormSelect
                                name="name"
                                label="Nama"
                                placeholder="Nama kategori pengeluaran anda."
                                options={kategoriPengeluaranData}
                                renderOption={(option: KategoriPengeluaranData) => (
                                    <React.Fragment key={option.label}>
                                        <Option
                                            value={option.label}
                                            label={option.label}
                                        >
                                            <ListItemContent
                                                sx={{ fontSize: "sm" }}
                                            >
                                                {option.label}
                                                <Typography level="body3">
                                                    {option.group}
                                                </Typography>
                                            </ListItemContent>
                                        </Option>
                                    </React.Fragment>
                                )}
                            />
                            <FormSelect
                                name="priority"
                                label="Skala Prioritas"
                                placeholder="Skala prioritas kategori pengeluaran."
                                options={prioritasPengeluaranData}
                                renderOption={(option: PrioritasPengeluaranData) => {
                                    const OptionIcon = React.createElement(option.icon, {
                                        color: option.iconColor,
                                        size: 20,
                                    })
                                    return (
                                        <React.Fragment key={option.label}>
                                            <Option
                                                value={option.label}
                                                label={option.labelText}
                                            >
                                                <ListItemDecorator>
                                                    {OptionIcon}
                                                </ListItemDecorator>
                                                <ListItemContent>
                                                    {option.labelText}
                                                </ListItemContent>
                                            </Option>
                                        </React.Fragment>
                                    )
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                sx={{
                                    alignSelf: "flex-end",
                                    borderRadius: "3rem",
                                    color: colors.neutral,
                                    fontWeight: 400,
                                    backgroundColor: colors.primary,
                                    fontSize: "md",
                                }}
                            >
                                Simpan
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Stack>
        </BottomDrawer >
    )
}

function DeleteKategoriPengeluaranModal({
    isOpen,
    onClose,
    onCommit,
}: {
    isOpen: boolean,
    onClose: () => void,
    onCommit: () => void,
}) {
    return (
        <ConfirmationModal
            open={isOpen}
            onCancel={onClose}
            onConfirm={onCommit}
            cancelText="Batalkan"
            confirmText="Ya, Hapus"
        >
            <Typography
                level="body1"
                lineHeight="sm"
                gutterBottom
                textColor={colors.secondary}
            >
                *Mohon dipertimbangkan dengan baik sebelum menghapus data.
                Tindakan ini berpengaruh pada konsistensi laporan keuangan Anda.
                Data yang dihapus tidak dapat dikembalikan dan berpotensi menyebabkan kehilangan informasi penting.
            </Typography>
            <Typography
                fontSize="lg"
                lineHeight="sm"
                textColor={colors.neutral}
            >
                Apakah anda yakin ingin menghapus kategori pengeluaran ini?
            </Typography>
        </ConfirmationModal>
    )
}

function DataItem({
    item,
    onEdit,
    onDelete,
}: {
    item: KategoriPengeluaran,
    onEdit: (item: Partial<KategoriPengeluaran>) => void,
    onDelete: (id: number) => void,
}) {
    const iconProps = {
        size: 24,
    }

    const lowIconProps = {
        ...iconProps,
        color: priorityColors.low,
    }
    const mediumIconProps = {
        ...iconProps,
        color: priorityColors.medium,
    }
    const highIconProps = {
        ...iconProps,
        color: priorityColors.high,
    }

    const logDate = dataLogDate(item)
    const logDateString = `${logDate.textDate} ${logDate.date}`

    return (
        <Stack
            useFlexGap
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
        >
            <Stack
                useFlexGap
                direction="row"
                alignItems="center"
                spacing={1.5}
            >
                <Box>
                    {item.priority <= 1 && <LowPriority {...lowIconProps} />}
                    {item.priority == 2 && <MediumPriority {...mediumIconProps} />}
                    {item.priority == 3 && <HighPriority {...highIconProps} />}
                </Box>
                <Box
                    maxWidth={300}
                >
                    <Typography
                        fontSize={17}
                        textColor={colors.secondary}
                    >
                        {item.name}
                    </Typography>
                    <Stack
                        useFlexGap
                        direction="row"
                        alignItems="center"
                        spacing={0.7}
                    >
                        <InfoIcon color={colors.secondary} size={15} />
                        <Typography
                            lineHeight="sm"
                            fontSize={13}
                            textColor={colors.secondary}
                        >
                            {logDateString}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
            <ActionButton
                disableEdit
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
            />
        </Stack>
    )
}

export default function KategoriPengeluaran() {
    const queryClient = useQueryClient()

    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<Partial<KategoriPengeluaran>>({
        name: "",
        priority: 0,
    })
    const [formId, setFormId] = useState<number | undefined>()
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false)

    const { data, isLoading } = useQuery({
        queryKey: ["kategoriPengeluaran"],
        queryFn: fetchKategoriPengeluaran
    })

    const mutationDelete = useMutation({
        mutationFn: removeKategoriPengeluaran,
        onSuccess: () => {
            queryClient.invalidateQueries(["kategoriPengeluaran"])
        },
    })

    const mutationAddForm = useMutation({
        mutationFn: addKategoriPengeluaran,
        onSuccess: () => {
            queryClient.invalidateQueries(["kategoriPengeluaran"])
        },
    })

    const mutationEditForm = useMutation({
        mutationFn: editKategoriPengeluaran,
        onSuccess: () => {
            queryClient.invalidateQueries(["kategoriPengeluaran"])
        },
    })

    const items: Array<KategoriPengeluaran> | undefined = data?.data
    const isEmpty: boolean = data?.total === 0

    const createCallback = () => {
        setMode("create")
        setIsOpenFormModal(true)
        setFormData({
            name: "",
            priority: 0
        })
    }

    const editCallback = (formData: Partial<KategoriPengeluaran>) => {
        setFormData({
            id: formData.id,
            name: formData.name,
            priority: formData.priority,
        })
        setMode("edit")
        setIsOpenFormModal(true)
    }

    const closeFormModalCallback = () => {
        setMode(null)
        setFormData({
            name: "",
            priority: 0
        })
        setIsOpenFormModal(false)
    }

    const submissionCallback = (payload: Partial<KategoriPengeluaran>) => {
        if (mode === "create") {
            mutationAddForm.mutate(payload)
        }

        if (mode === "edit") {
            mutationEditForm.mutate(payload)
        }

        setFormData({
            name: "",
            priority: 0
        })
        setMode(null)
        setIsOpenFormModal(false)
    }

    const deleteCallback = (id: number) => {
        setFormId(id)
        setIsOpenDeleteModal(true)
    }

    const closeDeleteModalCallback = () => {
        setFormData({
            name: "",
            priority: 0
        })
        setIsOpenDeleteModal(false)
    }

    const deleteKategoriPengeluaranCallback = () => {
        mutationDelete.mutate(formId)
        setFormId(undefined)
        setIsOpenDeleteModal(false)
    }

    return (
        <>
            <PageLayout>
                <PageHeader
                    title="Pengaturan"
                    subtitle="Kategori Pengeluaran"
                    backUrl="/pengaturan"
                />
                <CreateButton onClick={createCallback} />
                {isLoading && !isEmpty ? (
                    <Loading />
                ) : (
                    <Stack
                        marginTop="1.2rem"
                        padding="1.5rem"
                        useFlexGap
                        spacing={2}
                    >
                        <InformationBanner
                            title="Informasi"
                        >
                            <div>
                                <Typography
                                    fontSize={15}
                                    lineHeight="sm"
                                    fontWeight={400}
                                    color="neutral"
                                    sx={{
                                        opacity: 0.8,
                                    }}
                                >
                                    Kategori pengeluaran adalah cara untuk mengelompokkan pengeluaran Anda.
                                    Dengan menggunakan kategori, Anda dapat dengan mudah melihat laporan keuangan Anda berdasarkan prioritas.
                                </Typography>
                            </div>
                        </InformationBanner>
                        <DataWrapper
                            data={items}
                            renderItem={(item: KategoriPengeluaran) => (
                                <DataItem
                                    key={item.id}
                                    item={item}
                                    onEdit={editCallback}
                                    onDelete={deleteCallback}
                                />
                            )}
                        />
                    </Stack>
                )}
            </PageLayout>
            <KategoriPengeluaranModalForm
                formMode={mode}
                isOpen={isOpenFormModal}
                onClose={closeFormModalCallback}
                formData={formData}
                submission={submissionCallback}
            />
            <DeleteKategoriPengeluaranModal
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModalCallback}
                onCommit={deleteKategoriPengeluaranCallback}
            />
        </>
    )
}
