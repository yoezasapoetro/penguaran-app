import * as React from "react"
import { useState } from "react"
import {
    Stack,
    Typography,
    colors
} from "@mui/joy"

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
import { StoreType, StoreFormData, StoreItemsReturn } from "types/Store"
import { dataLogDate } from "utils/date"
import DataPagination from "components/ui/DataPagination"
import { trpc } from "api/utils/trpc"
import { StoreForm } from "components/forms"
import { LocationIcon } from "components/icons"

function WarningDeletionModal(props: {
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
    item: StoreType,
    onEdit: (item: StoreType) => void,
    onDelete: (id?: number) => void,
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

export default function Stores() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<StoreFormData>({
        name: "",
        type: "",
        address: "",
    })

    const [formId, setFormId] = useState<number>()
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const { data, isLoading } = trpc.store.getAll.useQuery({
        page: currentPage
    })
    const mutationDelete = trpc.store.delete.useMutation()
    const mutationAddForm = trpc.store.create.useMutation()
    const mutationEditForm = trpc.store.update.useMutation()

    const items: StoreItemsReturn | undefined = data?.data
    const totalPage = data?.totalPage
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

    const editCallback = (data: StoreType) => {
        setFormData({
            name: data.name,
            type: data.type,
            address: data.address || "",
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

    const submissionCallback = (payload: StoreFormData) => {
        if (mode === "create") {
            mutationAddForm.mutate(payload)
        }

        if (mode === "edit" && !!formId) {
            mutationEditForm.mutate({ id: formId, payload })
        }

        setFormData({
            name: "",
            type: "",
            address: "",
        })
        setMode(null)
        setIsOpenFormModal(false)
    }

    const deleteCallback = (id?: number) => {
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
                    subtitle="Penjual & Entitas"
                    backUrl="/settings"
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
                        <DataWrapper<StoreType>
                            data={items}
                            renderItem={(item: StoreType) => (
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
                <StoreForm
                    formMode={mode}
                    isOpen={isOpenFormModal}
                    onClose={closeFormModalCallback}
                    formData={formData}
                    submission={submissionCallback}
                />
                <WarningDeletionModal
                    isOpen={isOpenDeleteModal}
                    onClose={closeDeleteModalCallback}
                    onCommit={deletePenjualCallback}
                />
            </PageLayout>
        </>
    )
}
