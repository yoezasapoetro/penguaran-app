import * as React from "react"
import { useState } from "react"
import {
    Box,
    Stack,
    Typography,
    colors
} from "@mui/joy"
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
    ConfirmationModal,
} from "components/ui"
import { SourcePaymentType, SourcePaymentItemsReturn, SourcePaymentFormData } from "types/SourcePayment"
import { dataLogDate } from "utils/date"
import DataPagination from "components/ui/DataPagination"
import { trpc } from "api/utils/trpc"
import { SourcePaymentForm } from "forms/index"

function WarningDeletionModal({
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
    item: SourcePaymentType,
    onEdit: (item: SourcePaymentType) => void,
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

export default function SourcePayments() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<SourcePaymentFormData>({
        name: "",
        type: "",
    })

    const [formId, setFormId] = useState<number | undefined>()
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const { data, isLoading } = trpc.sourcePayment.getAll.useQuery({
        page: currentPage
    })
    const mutationDelete = trpc.sourcePayment.delete.useMutation()
    const mutationAddForm = trpc.sourcePayment.create.useMutation()
    const mutationEditForm = trpc.sourcePayment.update.useMutation()

    const items: SourcePaymentItemsReturn | undefined = data?.data
    const totalPage = data?.totalPage
    const isEmpty: boolean = data?.total === 0

    const createCallback = () => {
        setMode("create")
        setIsOpenFormModal(true)
        setFormData({
            name: "",
            type: "",
        })
    }

    const editCallback = (data: SourcePaymentType) => {
        setFormData({
            name: data.name,
            type: data.type,
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

    const submissionCallback = (payload: SourcePaymentFormData) => {
        if (mode === "create") {
            mutationAddForm.mutate(payload)
        }

        if (mode === "edit" && !!formId) {
            mutationEditForm.mutate({ id: formId, payload })
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
        if (!!formId) {
            mutationDelete.mutate({ id: formId })
            setFormId(undefined)
            setIsOpenDeleteModal(false)
        }
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
                        marginTop={9}
                        marginBottom={8}
                    >
                        <DataWrapper<SourcePaymentType>
                            data={items}
                            renderItem={(item: SourcePaymentType) => (
                                <DataItem
                                    key={item.id}
                                    item={item}
                                    onEdit={editCallback}
                                    onDelete={deleteCallback}
                                />
                            )}
                        />
                        {!!totalPage && <DataPagination
                            currentPage={currentPage}
                            totalPage={totalPage}
                            onPageChange={setCurrentPage}
                        />}
                        <CreateButton onClick={createCallback} />
                    </Stack>
                )}
                <SourcePaymentForm
                    formMode={mode}
                    isOpen={isOpenFormModal}
                    onClose={closeFormModalCallback}
                    formData={formData}
                    submission={submissionCallback}
                />
                <WarningDeletionModal
                    isOpen={isOpenDeleteModal}
                    onClose={closeDeleteModalCallback}
                    onCommit={deleteSumberDanaCallback}
                />
            </PageLayout>
        </>
    )
}
