import {
    useField,
    useFormikContext,
} from "formik"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
} from "@mui/joy"

import colors from "../colors"

export default function FormSelect(props: {
    label: string
    name: string
    placeholder: string
    options: Array<any>
    renderOption: (option: any) => React.ReactNode
}) {
    const { label, options, renderOption, ...selectProps } = props
    const [field, meta] = useField(props.name)
    const { setFieldValue } = useFormikContext()

    const handleChange = (_: any, value: any) => {
        setFieldValue(props.name, value)
    }

    return (
        <FormControl error={Boolean(meta.error && meta.touched)}>
            <FormLabel>{label}</FormLabel>
            <Select
                {...selectProps}
                value={field.value}
                onChange={handleChange}
                slotProps={{
                    root: {
                        sx: {
                            color: colors.neutral,
                            borderRadius: 0,
                        }
                    }
                }}
            >
                {options.map(renderOption)}
            </Select>
            {meta.error && meta.touched && <FormHelperText>
                {meta.error}
            </FormHelperText>}
        </FormControl>
    )
}

