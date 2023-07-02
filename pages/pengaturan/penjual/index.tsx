import * as React from "react"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Button,
    ListItemContent,
    Option,
    Stack,
    Typography
} from "@mui/joy"
import { Form, Formik, FormikConfig, FormikHelpers } from "formik"
import { object, string } from "yup"
import {
    PageLayout,
    PageHeader,
    CreateButton,
    Loading,
    DataWrapper,
    ActionButton,
    LogDate,
    InformationBanner,
    BottomDrawer,
    FormSelect,
    FormInput,
    ConfirmationModal,
} from "@/components/ui"
import {
    Penjual,
    PenjualFormProps,
    PenjualTypeData,
} from "@/types/Penjual"
import {
    addPenjual,
    editPenjual,
    fetchPenjual,
    removePenjual
} from "@/actions/penjual"
import { dataLogDate } from "@/lib/utils/date"
import colors from "@/components/colors"
import { penjualType } from "@/data"
import {
    FaCity as LocationIcon
} from "react-icons/fa"

function PenjualModalForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: PenjualFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: Partial<Penjual>) => void
}) {
    const title: Record<string, string> = {
        edit: "Edit Penjual atau Entitas",
        create: "Tambah Penjual atau Entitas",
    }

    const isEdit = formMode === "edit"

    const formikConfig: FormikConfig<Partial<Penjual>> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            type: formData.type,
            address: formData.address,
        },
        validationSchema: object({
            name: string().required("Nama tidak boleh kosong."),
            type: string().required("Tipe tidak boleh kosong")
        }),
        onSubmit: (data: any, action: FormikHelpers<any>) => {
            submission({
                name: data.name,
                type: data.type,
                address: data.address,
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
                            <FormInput
                                name="name"
                                label="Nama"
                                placeholder="Nama penjual & entitas anda."
                            />
                            <FormSelect
                                name="type"
                                label="Tipe"
                                placeholder="Tipe penjual & entitas anda."
                                options={penjualType}
                                renderOption={(option: PenjualTypeData) => {
                                    return (
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
                                    )
                                }}
                            />
                            <FormInput
                                name="address"
                                label="Alamat"
                                placeholder="Alamat penjual & entitas anda."
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

function DeletePenjualModal({
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
                Apakah anda yakin ingin menghapus penjual & entitas ini?
            </Typography>
        </ConfirmationModal>
    )
}

function DataItem({
    item,
    onEdit,
    onDelete,
}: {
    item: Penjual,
    onEdit: (item: Partial<Penjual>) => void,
    onDelete: (id: number) => void,
}) {
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
                alignItems="flex-start"
            >
                <Typography
                    fontSize={17}
                    lineHeight="sm"
                    textColor={colors.secondary}
                >
                    {item.name}
                </Typography>
                <Typography
                    fontSize={15}
                    textColor={colors.neutral}
                >
                    {item.type}
                </Typography>
                <Stack
                    useFlexGap
                    direction="row"
                    alignItems="center"
                    spacing={0.7}
                >
                    <LocationIcon
                        color={colors.secondary}
                        size={15}
                    />
                    <Typography
                        lineHeight="sm"
                        fontSize={14}
                        textColor={colors.secondary}
                    >
                        {item.address}
                    </Typography>
                </Stack>
                <LogDate date={logDateString} />
            </Stack>
            <ActionButton
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
            />
        </Stack>
    )
}

export default function Penjual() {
    const queryClient = useQueryClient()

    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<Partial<Penjual>>({
        name: "",
        type: "",
        address: "",
    })

    const [formId, setFormId] = useState<number | undefined>()
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ["penjual"],
        queryFn: fetchPenjual
    })

    const mutationDelete = useMutation({
        mutationFn: removePenjual,
        onSuccess: () => {
            queryClient.invalidateQueries(["penjual"])
        },
    })

    const mutationAddForm = useMutation({
        mutationFn: addPenjual,
        onSuccess: () => {
            queryClient.invalidateQueries(["penjual"])
        },
    })

    const mutationEditForm = useMutation({
        mutationFn: editPenjual,
        onSuccess: () => {
            queryClient.invalidateQueries(["penjual"])
        },
    })

    const items: Array<Penjual> | undefined = data?.data
    const isEmpty: boolean = data?.total === 0

    const createCallback = () => {
        setMode("create")
        setIsOpenFormModal(true)
        setFormData({
            name: "",
            type: "",
            address: "",
        })
    }

    const editCallback = (formData: Partial<Penjual>) => {
        setFormData({
            id: formData.id,
            name: formData.name,
            type: formData.type,
            address: formData.address,
        })
        setMode("edit")
        setIsOpenFormModal(true)
    }

    const closeFormModalCallback = () => {
        setMode(null)
        setFormData({
            name: "",
            type: "",
            address: "",
        })
        setIsOpenFormModal(false)
    }

    const submissionCallback = (payload: Partial<Penjual>) => {
        if (mode === "create") {
            mutationAddForm.mutate(payload)
        }

        if (mode === "edit") {
            mutationEditForm.mutate(payload)
        }

        setFormData({
            name: "",
            type: "",
            address: "",
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
            type: "",
            address: "",
        })
        setIsOpenDeleteModal(false)
    }

    const deletePenjualCallback = () => {
        mutationDelete.mutate(formId)
        setFormId(undefined)
        setIsOpenDeleteModal(false)
    }

    return (
        <>
            <PageLayout>
                <PageHeader
                    title="Pengaturan"
                    subtitle="Penjual & Entitas"
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
                                    Dengan mencatat data penjual & entitas,
                                    Anda dapat memantau riwayat transaksi dan mengidentifikasi tren pengeluaran,
                                    sehingga memungkinkan Anda untuk mengelola keuangan keluarga dengan lebih baik.
                                </Typography>
                            </div>
                        </InformationBanner>
                        <DataWrapper
                            data={items}
                            renderItem={(item: Penjual) => (
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
                <PenjualModalForm
                    formMode={mode}
                    isOpen={isOpenFormModal}
                    onClose={closeFormModalCallback}
                    formData={formData}
                    submission={submissionCallback}
                />
                <DeletePenjualModal
                    isOpen={isOpenDeleteModal}
                    onClose={closeDeleteModalCallback}
                    onCommit={deletePenjualCallback}
                />
            </PageLayout>
        </>
    )
}
