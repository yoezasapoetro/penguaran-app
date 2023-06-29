import * as React from "react"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputProps,
} from "@mui/joy"

import colors from "../colors"

export default function FormInput(props: InputProps & {
    label: string
    error: boolean
    errorMessage: string | null
}) {
    const inputProps = {
        sx: {
            '--Input-radius': 0,
            '--Input-focusedThickness': 1,
            '--Input-placeholderColor': colors.secondary,
            fontSize: 15,
            color: colors.neutral,
        },
        ...props,
        ...({
            type: props.type ?? "text",
        })
    }

    return (
        <FormControl error={props.error}>
            <FormLabel>{props.label}</FormLabel>
            <Input
                {...inputProps}
            />
            {props.error && <FormHelperText>
                {props.errorMessage}
            </FormHelperText>}
        </FormControl>
    )
}

