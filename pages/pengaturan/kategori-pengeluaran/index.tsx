import * as React from "react"
import { useState } from "react"
import {
    Stack,
    Button,
    Box,
    Typography,
    ListItemContent,
    Option,
} from "@mui/joy"
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
import { priorityColors } from "@/components/colors"
import {
    BottomDrawer,
    PageLayout,
    PageHeader,
    Loading,
    CreateButton,
    ActionButton,
    FormSelect,
    FormRadioGroup,
    ConfirmationModal,
    DataWrapper,
    LogDate,
    InformationBanner,
    DataPagination,
} from "@/components/ui"
import { dataLogDate } from "@/lib/utils/date"
import { kategoriPengeluaranData, prioritasPengeluaranData } from "@/data"
import {
    KategoriPengeluaran,
    KategoriPengeluaranData,
    KategoriPengeluaranFormProps,
} from "@/types/KategoriPengeluaran"
import {
    addKategoriPengeluaran,
    editKategoriPengeluaran,
    fetchKategoriPengeluaran,
    removeKategoriPengeluaran
} from "@/actions/kategoriPengeluaran"

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
                        <FormRadioGroup
                            hasIconDecorator
                            name="priority"
                            label="Skala Prioritas"
                            placeholder="Skala prioritas kategori pengeluaran."
                            defaultValue={1}
                            options={prioritasPengeluaranData}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                borderRadius: 0,
                                fontWeight: 400,
                                fontSize: "md",
                                bgcolor: "primary.900",
                                color: "success.300",
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

function DeleteKategoriPengeluaranModal(props: {
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
                level="body1"
                lineHeight="sm"
                gutterBottom
            >
                *Mohon dipertimbangkan dengan baik sebelum menghapus data.
                Tindakan ini berpengaruh pada konsistensi laporan keuangan Anda.
                Data yang dihapus tidak dapat dikembalikan dan berpotensi menyebabkan kehilangan informasi penting.
            </Typography>
            <Typography
                fontSize="lg"
                lineHeight="sm"
            >
                Apakah anda yakin ingin menghapus kategori pengeluaran ini?
            </Typography>
        </ConfirmationModal>
    )
}

function DataItem(props: {
    item: KategoriPengeluaran,
    onEdit: (item: Partial<KategoriPengeluaran>) => void,
    onDelete: (id: number) => void,
}) {
    const iconProps = {
        size: 20,
    }

    const { item } = props

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
                    >
                        {item.name}
                    </Typography>
                    <LogDate date={logDateString} />
                </Box>
            </Stack>
            <ActionButton
                onEdit={() => props.onEdit(item)}
                onDelete={() => props.onDelete(item.id)}
            />
        </Stack>
    )
}

export default function KategoriPengeluaran() {
    const queryClient = useQueryClient()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<Partial<KategoriPengeluaran>>({
        name: "",
        priority: 0,
    })
    const [formId, setFormId] = useState<number | undefined>()
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false)

    const { data, isLoading } = useQuery({
        queryKey: ["kategoriPengeluaran", currentPage],
        queryFn: () => fetchKategoriPengeluaran(currentPage),
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
    const totalPage = data?.totalPage as number
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
                {isLoading && !isEmpty ? (
                    <Loading />
                ) : (
                    <Stack
                        padding="1rem"
                        useFlexGap
                        spacing={2}
                        marginTop={9}
                        marginBottom={8}
                    >
                        <InformationBanner
                            title="Informasi"
                        >
                            <div>
                                <Typography
                                    fontSize="sm"
                                    lineHeight="sm"
                                    fontWeight="sm"
                                    textColor="white"
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
                        {!!totalPage && <DataPagination
                            totalPage={totalPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />}
                        <CreateButton onClick={createCallback} />
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
