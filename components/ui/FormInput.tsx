import * as React from "react"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
} from "@mui/joy"

import { useField } from "formik"

export default function FormInput(props: {
    label: string
    type?: string
    placeholder: string
    name: string
}) {
    const [field, meta] = useField(props.name)

    const inputProps = {
        sx: {
            '--Input-radius': 0,
            '--Input-focusedThickness': 1,
            fontSize: "md",
        },
        ...field,
        type: props.type ?? "text",
        placeholder: props.placeholder,
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

