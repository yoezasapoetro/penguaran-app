import * as React from "react"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Box,
    Button,
    ListItemContent,
    ListItemDecorator,
    Option,
    Stack,
    Typography,
    colors
} from "@mui/joy"
import { Form, Formik, FormikConfig, FormikHelpers } from "formik"
import { object, string } from "yup"
import {
    BsBank as BankIcon,
    BsCash as MoneyIcon,
} from "react-icons/bs"
import {
    HiOutlineWallet as EWalletIcon,
} from "react-icons/hi2"
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
    FormRadioGroup,
} from "@/components/ui"
import {
    SumberDana,
    SumberDanaFormProps,
    SumberDanaTypeData,
} from "@/types/SumberDana"
import {
    addSumberDana,
    editSumberDana,
    fetchSumberDana,
    removeSumberDana
} from "@/actions/sumberDana"
import { dataLogDate } from "@/lib/utils/date"
import { sumberDanaType } from "@/data"
import DataPagination from "@/components/ui/DataPagination"

function SumberDanaModalForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: SumberDanaFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: Partial<SumberDana>) => void
}) {
    const title: Record<string, string> = {
        edit: "Edit Sumber Dana",
        create: "Tambah Sumber Dana",
    }

    const isEdit = formMode === "edit"

    const formikConfig: FormikConfig<Partial<SumberDana>> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            type: formData.type,
        },
        validationSchema: object({
            name: string().required("Nama tidak boleh kosong."),
            type: string().required("Tipe tidak boleh kosong")
        }),
        onSubmit: (data: any, action: FormikHelpers<any>) => {
            submission({
                name: data.name,
                type: data.type,
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
            <Typography
                fontSize="lg"
                textColor="primary.900"
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
                            placeholder="Nama sumber dana anda."
                        />
                        <FormRadioGroup
                            hasIconDecorator
                            name="type"
                            label="Tipe"
                            placeholder="Tipe sumber dana anda."
                            defaultValue="bank"
                            options={sumberDanaType}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                borderRadius: "3rem",
                                color: "success.300",
                                fontWeight: 400,
                                backgroundColor: "primary.900",
                                fontSize: "md",
                            }}
                        >
                            Simpan
                        </Button>
                    </Form>
                )}
            </Formik>
        </BottomDrawer >
    )
}

function DeleteSumberDanaModal({
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
                fontSize="sm"
                lineHeight="sm"
                gutterBottom
                textColor="primary.900"
            >
                *Mohon dipertimbangkan dengan baik sebelum menghapus data.
                Tindakan ini berpengaruh pada konsistensi laporan keuangan Anda.
                Data yang dihapus tidak dapat dikembalikan dan berpotensi menyebabkan kehilangan informasi penting.
            </Typography>
            <Typography
                lineHeight="sm"
                gutterBottom
                textColor="primary.900"
            >
                Apakah anda yakin ingin menghapus sumber dana ini?
            </Typography>
        </ConfirmationModal>
    )
}

function DataItem(props: {
    item: SumberDana,
    onEdit: (item: Partial<SumberDana>) => void,
    onDelete: (id: number) => void,
}) {
    const { item } = props
    const logDate = dataLogDate(item)
    const logDateString = `${logDate.textDate} ${logDate.date}`

    const iconProps = {
        size: 21,
        color: colors.grey[300]
    }

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
                <>
                    {item.type === "e-wallet" && <EWalletIcon {...iconProps} />}
                    {item.type === "cash" && <MoneyIcon {...iconProps} />}
                    {item.type === "bank" && <BankIcon {...iconProps} />}
                </>
                <Box
                    maxWidth={300}
                >
                    <Typography
                        textColor="primary.900"
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

export default function SumberDana() {
    const queryClient = useQueryClient()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<Partial<SumberDana>>({
        name: "",
        type: "",
    })

    const [formId, setFormId] = useState<number | undefined>()
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ["sumberDana", currentPage],
        queryFn: () => fetchSumberDana(currentPage)
    })

    const mutationDelete = useMutation({
        mutationFn: removeSumberDana,
        onSuccess: () => {
            queryClient.invalidateQueries(["sumberDana"])
        },
    })

    const mutationAddForm = useMutation({
        mutationFn: addSumberDana,
        onSuccess: () => {
            queryClient.invalidateQueries(["sumberDana"])
        },
    })

    const mutationEditForm = useMutation({
        mutationFn: editSumberDana,
        onSuccess: () => {
            queryClient.invalidateQueries(["sumberDana"])
        },
    })

    const items: Array<SumberDana> | undefined = data?.data
    const totalPage = data?.totalPage as number
    const isEmpty: boolean = data?.total === 0

    const createCallback = () => {
        setMode("create")
        setIsOpenFormModal(true)
        setFormData({
            name: "",
            type: "",
        })
    }

    const editCallback = (formData: Partial<SumberDana>) => {
        setFormData({
            id: formData.id,
            name: formData.name,
            type: formData.type,
        })
        setMode("edit")
        setIsOpenFormModal(true)
    }

    const closeFormModalCallback = () => {
        setMode(null)
        setFormData({
            name: "",
            type: "",
        })
        setIsOpenFormModal(false)
    }

    const submissionCallback = (payload: Partial<SumberDana>) => {
        if (mode === "create") {
            mutationAddForm.mutate(payload)
        }

        if (mode === "edit") {
            mutationEditForm.mutate(payload)
        }

        setFormData({
            name: "",
            type: "",
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
        })
        setIsOpenDeleteModal(false)
    }

    const deleteSumberDanaCallback = () => {
        mutationDelete.mutate(formId)
        setFormId(undefined)
        setIsOpenDeleteModal(false)
    }

    return (
        <>
            <PageLayout>
                <PageHeader
                    title="Pengaturan"
                    subtitle="Sumber Dana"
                    backUrl="/pengaturan"
                />
                {isLoading && !isEmpty ? (
                    <Loading />
                ) : (
                    <Stack
                        padding="1rem"
                        useFlexGap
                        spacing={2}
                    >
                        <InformationBanner
                            title="Informasi"
                        >
                            <div>
                                <Typography
                                    fontSize="sm"
                                    lineHeight="sm"
                                    fontWeight="xs"
                                    textColor="common.white"
                                >
                                    Harap berikan kategori sumber dana untuk pengeluaran Anda.
                                    Ini akan membantu Anda mengelompokkan dan melacak pengeluaran dengan lebih baik.
                                </Typography>
                            </div>
                        </InformationBanner>
                        <DataWrapper
                            data={items}
                            renderItem={(item: SumberDana) => (
                                <DataItem
                                    key={item.id}
                                    item={item}
                                    onEdit={editCallback}
                                    onDelete={deleteCallback}
                                />
                            )}
                        />
                        <DataPagination
                            currentPage={currentPage}
                            totalPage={totalPage}
                            onPageChange={setCurrentPage}
                        />
                    </Stack>
                )}
                <SumberDanaModalForm
                    formMode={mode}
                    isOpen={isOpenFormModal}
                    onClose={closeFormModalCallback}
                    formData={formData}
                    submission={submissionCallback}
                />
                <DeleteSumberDanaModal
                    isOpen={isOpenDeleteModal}
                    onClose={closeDeleteModalCallback}
                    onCommit={deleteSumberDanaCallback}
                />
            </PageLayout>
            <CreateButton onClick={createCallback} />
        </>
    )
}
