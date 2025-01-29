import * as React from "react"
import { useField } from "formik"
import { useState } from "react"
import { FormControl, FormHelperText, FormLabel, Input, InputProps } from "@mui/joy"

import { StoreItemsReturn } from "types/Store"
import { pickerInputSxProps } from "utils/joyStyling"
import { FormModalPicker } from "components/ui"
import { trpc } from "api/utils/trpc"

export default function StorePicker(props: InputProps & {
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
        setInputValue(_value?.name || "")
    }

    let result: StoreItemsReturn = []

    const { data, status, hasNextPage, fetchNextPage } = trpc.store.getAll.useInfiniteQuery({
        page: 0
    },
    {
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        }
    })

    if (status === "success") {
        result = data.pages.reduce((acc: StoreItemsReturn, page: any) => {
            return [...acc, ...page.data]
        }, [])
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
                hasNextPage={hasNextPage || false}
                fetchNextPage={fetchNextPage}
                result={result}
                selected={field.value}
                setSelected={handleChange}
            />
        </>
    )
}

