import * as React from "react"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputProps,
} from "@mui/joy"

import { useField } from "formik"

export default function FormInput(props: {
    label: string
    name: string
    min?: number
    max?: number
    step?: string
} & InputProps) {
    const [field, meta] = useField(props.name)
    const { min, max, step } = props
    const slotProps = props.type === "number" ?
        { min, max, step } : {}

    const inputProps = {
        sx: {
            '--Input-radius': 0,
            '--Input-focusedThickness': 1,
            fontSize: "md",
        },
        ...field,
        type: props.type ?? "text",
        placeholder: props.placeholder,
        ...slotProps,
    }

    return (
        <FormControl error={Boolean(meta.error && meta.touched)}>
            <FormLabel>{props.label}</FormLabel>
            <Input
                {...inputProps}
            />
            {meta.error && meta.touched && <FormHelperText>
                {meta.error}
            </FormHelperText>}
        </FormControl>
    )
}

