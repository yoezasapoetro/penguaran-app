import * as React from "react"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Button,
    ListItemContent,
    Option,
    Stack,
    Typography,
    colors
} from "@mui/joy"
import { Form, Formik, FormikConfig, FormikHelpers } from "formik"
import { z } from "zod"
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
import { Store, StoreFormProps } from "types/Store"
import {
    addPenjual,
    editPenjual,
    fetchPenjual,
    removePenjual
} from "@/actions/store"
import { dataLogDate } from "utils/date"
import { Stores } from "db/data"
import { DataType } from "db/data/dataTypes"
import {
    FaCity as LocationIcon
} from "react-icons/fa"
import DataPagination from "@/components/ui/DataPagination"

function PenjualModalForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: StoreFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: Partial<Store>) => void
}) {
    const title: Record<string, string> = {
        edit: "Edit Penjual atau Entitas",
        create: "Tambah Penjual atau Entitas",
    }

    const isEdit = formMode === "edit"

    const formikConfig: FormikConfig<Partial<Store>> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            type: formData.type,
            address: formData.address,
        },
        validationSchema: z.object({
            name: z.string({
                required_error: "Nama tidak boleh kosong."
            }),
            type: z.string({
                required_error: "Tipe tidak boleh kosong"
            })
        }).required({
            name: true,
            type: true
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
            backdropClick
        >
            <Typography
                fontSize="lg"
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
                            marginTop: "0.5rem",
                            flex: "1",
                        }}
                    >
                        <FormSelect
                            name="type"
                            label="Tipe"
                            placeholder="Tipe penjual & entitas anda."
                            options={Stores}
                            renderOption={(option: DataType) => {
                                return (
                                    <React.Fragment key={option.label}>
                                        <Option
                                            value={option.label}
                                            sx={{
                                                maxWidth: "calc(100vw - 2rem)",
                                            }}
                                        >
                                            <ListItemContent
                                                sx={{
                                                    fontSize: "md",
                                                    overflowWrap: "break-word",
                                                    wordBreak: "break-word",
                                                    whiteSpace: "pre-line",
                                                }}
                                            >
                                                {option.label}
                                                <Typography
                                                    fontSize="sm"
                                                    fontWeight={500}
                                                    sx={{
                                                        overflowWrap: "break-word",
                                                        wordBreak: "break-word",
                                                        whiteSpace: "pre-line",
                                                        hyphens: "manual",
                                                    }}
                                                >
                                                    {option.group}
                                                </Typography>
                                            </ListItemContent>
                                        </Option>
                                    </React.Fragment>
                                )
                            }}
                        />
                        <FormInput
                            name="name"
                            label="Nama"
                            placeholder="Nama penjual & entitas anda."
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
                                borderRadius: 0,
                                fontWeight: 400,
                                fontSize: "md",
                                color: "success.300",
                                backgroundColor: "primary.900",
                            }}
                        >
                            Simpan
                        </Button>
                    </Form>
                )}
            </Formik>
        </BottomDrawer>
    )
}

function DeletePenjualModal(props: {
    isOpen: boolean,
    onClose: () => void,
    onCommit: () => void,
}) {
    return (
        <ConfirmationModal
            open={props.isOpen}
            onCancel={props.onClose}
            onConfirm={props.onCommit}
            cancelText="Batalkan"
            confirmText="Ya, Hapus"
        >
            <Typography
                fontSize="sm"
                lineHeight="sm"
                gutterBottom
            >
                *Mohon dipertimbangkan dengan baik sebelum menghapus data.
                Tindakan ini berpengaruh pada konsistensi laporan keuangan Anda.
                Data yang dihapus tidak dapat dikembalikan dan berpotensi menyebabkan kehilangan informasi penting.
            </Typography>
            <Typography
                lineHeight="sm"
                gutterBottom
            >
                Apakah anda yakin ingin menghapus penjual & entitas ini?
            </Typography>
        </ConfirmationModal>
    )
}

function DataItem(props: {
    item: Store,
    onEdit: (item: Partial<Store>) => void,
    onDelete: (id: number) => void,
}) {
    const { item } = props
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
                >
                    {item.name}
                </Typography>
                <Typography
                    fontSize={15}
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
                        color={colors.grey[600]}
                        size={15}
                    />
                    <Typography
                        lineHeight="sm"
                        fontSize={14}
                        textColor={colors.grey[600]}
                    >
                        {item.address}
                    </Typography>
                </Stack>
                <LogDate date={logDateString} />
            </Stack>
            <ActionButton
                onEdit={() => props.onEdit(item)}
                onDelete={() => props.onDelete(item.id)}
            />
        </Stack>
    )
}

export default function Penjual() {
    const queryClient = useQueryClient()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<Partial<Store>>({
        name: "",
        type: "",
        address: "",
    })

    const [formId, setFormId] = useState<number | undefined>()
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ["penjual", currentPage],
        queryFn: () => fetchPenjual(currentPage)
    })

    const mutationDelete = useMutation({
        mutationFn: removePenjual,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["penjual"] })
        },
    })

    const mutationAddForm = useMutation({
        mutationFn: addPenjual,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["penjual"] })
        },
    })

    const mutationEditForm = useMutation({
        mutationFn: editPenjual,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["penjual"] })
        },
    })

    const items: Array<Store> | undefined = data?.data
    const totalPage = data?.totalPage as number
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

    const editCallback = (formData: Partial<Store>) => {
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

    const submissionCallback = (payload: Partial<Store>) => {
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
                {isLoading && !isEmpty ? (
                    <Loading />
                ) : (
                    <Stack
                        padding="1rem"
                        useFlexGap
                        marginTop={9}
                        marginBottom={8}
                        rowGap={2}
                    >
                        <InformationBanner
                            title="Informasi"
                        >
                            <div>
                                <Typography
                                    fontSize="sm"
                                    lineHeight="sm"
                                    fontWeight={400}
                                    textColor="white"
                                >
                                    Dengan mencatat data penjual & entitas,
                                    Anda dapat memantau riwayat transaksi dan mengidentifikasi tren pengeluaran,
                                    sehingga memungkinkan Anda untuk mengelola keuangan keluarga dengan lebih baik.
                                </Typography>
                            </div>
                        </InformationBanner>
                        <DataWrapper
                            data={items}
                            renderItem={(item: Store) => (
                                <DataItem
                                    key={item.id}
                                    item={item}
                                    onEdit={editCallback}
                                    onDelete={deleteCallback}
                                />
                            )}
                        />
                        {totalPage !== 0 && <DataPagination
                            totalPage={totalPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />}
                        <CreateButton onClick={createCallback} />
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
