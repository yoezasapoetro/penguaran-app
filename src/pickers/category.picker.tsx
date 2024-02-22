import * as React from "react"
import { FormControl, FormHelperText, FormLabel, Input, InputProps } from "@mui/joy"
import { useField } from "formik"
import { useState } from "react"

import { FormModalPicker } from "components/ui"
import { CategoryItemsReturn } from "types/Category"
import { pickerInputSxProps } from "utils/pickers"
import { trpc } from "api/utils/trpc"

export default function CategoryPicker(props: InputProps & {
    label: string
    name: string
}) {
    const [inputValue, setInputValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const [field, meta, helpers] = useField(props.name)

    function handleChange(val: number) {
        helpers.setValue(val)
        const [_value] = result.filter(
            ({ id }) => (id === val)
        )
        setInputValue(_value.name || "")
    }

    let result: CategoryItemsReturn = []

    const { data, status, fetchNextPage, hasNextPage } = trpc.category.getAll.useInfiniteQuery({
        page: 0,
    }, {
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        }
    })

    if (status === "success") {
        result = data.pages.reduce((acc: CategoryItemsReturn, page: any) => {
            return [...acc, ...page.data]
        }, [])
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
                hasNextPage={hasNextPage || false}
                fetchNextPage={fetchNextPage}
                selected={field.value}
                result={result}
                setSelected={handleChange}
            />
        </>
    )
}


