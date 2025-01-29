import { FormControl, FormHelperText, FormLabel, Input, InputProps } from "@mui/joy"
import { useField } from "formik"
import { useState } from "react"

import { SourcePaymentItemsReturn } from "types/SourcePayment"
import { trpc } from "api/utils/trpc"
import { pickerInputSxProps } from "utils/joyStyling"
import { FormModalPicker } from "components/ui"

export default function SourcePaymentPicker(props: InputProps & {
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

    let result: SourcePaymentItemsReturn = []

    const { data, status, hasNextPage, fetchNextPage } = trpc.sourcePayment.getAll.useInfiniteQuery({
        page: 0
    },
    {
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        }
    })

    if (status === "success") {
        result = data.pages.reduce((acc: SourcePaymentItemsReturn, page: any) => {
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
                modalTitle="Pilih sumber dana"
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


