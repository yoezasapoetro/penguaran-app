import * as React from "react"
import { useState } from "react"
import {
    Stack,
    Box,
    Typography,
} from "@mui/joy"

import { priorityColors } from "components/colors"
import {
    PageLayout,
    PageHeader,
    Loading,
    CreateButton,
    ActionButton,
    ConfirmationModal,
    DataWrapper,
    LogDate,
    DataPagination,
} from "components/ui"
import { dataLogDate } from "utils/date"
import { CategoryFormData, CategoryItemsReturn, CategoryType } from "types/Category"
import { trpc } from "api/utils/trpc"
import { CategoryForm } from "components/forms"
import { HighPriority, LowPriority, MediumPriority } from "components/icons"

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
    item: CategoryType,
    onEdit: (item: CategoryType) => void,
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
                    {!!item.priority && item.priority <= 1 && <LowPriority {...lowIconProps} />}
                    {!!item.priority && item.priority == 2 && <MediumPriority {...mediumIconProps} />}
                    {!!item.priority && item.priority == 3 && <HighPriority {...highIconProps} />}
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

export default function Categories() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mode, setMode] = useState<"create" | "edit" | null>(null)
    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        priority: 0,
    })
    const [formId, setFormId] = useState<number>()
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false)

    const { data, isSuccess, isLoading } = trpc.category.getAll.useQuery({
        page: currentPage
    })
    const mutationDelete = trpc.category.delete.useMutation()
    const mutationAddForm = trpc.category.create.useMutation()
    const mutationEditForm = trpc.category.update.useMutation()

    let items: CategoryItemsReturn = []
    let totalPage: number = 0
    let isEmpty: boolean = true

    if (isSuccess) {
        items = data.data
        totalPage = data.totalPage
        isEmpty = data.total === 0
    }

    const createCallback = () => {
        setMode("create")
        setIsOpenFormModal(true)
        setFormData({
            name: "",
            priority: 0
        })
    }

    const editCallback = (data: CategoryType) => {
        setFormData({
            name: data.name,
            priority: data.priority,
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

    const submissionCallback = (payload: CategoryFormData) => {
        if (mode === "create") {
            mutationAddForm.mutate(payload)
        }

        if (mode === "edit" && !!formId) {
            mutationEditForm.mutate({ id: formId, payload })
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

    const deleteCategoryCallback = () => {
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
                    subtitle="Kategori Pengeluaran"
                    backUrl="/settings"
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
                        <DataWrapper<CategoryType>
                            data={items}
                            renderItem={(item: CategoryType) => (
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
            <CategoryForm
                formMode={mode}
                isOpen={isOpenFormModal}
                onClose={closeFormModalCallback}
                formData={formData}
                submission={submissionCallback}
            />
            <WarningDeletionModal
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModalCallback}
                onCommit={deleteCategoryCallback}
            />
        </>
    )
}
