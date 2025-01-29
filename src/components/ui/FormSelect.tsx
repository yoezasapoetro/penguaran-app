import {
    useField,
    useFormikContext,
} from "formik"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    SelectOption,
} from "@mui/joy"

export default function FormSelect<T extends Record<string, unknown>>(props: {
    label: string
    name: string
    placeholder: string
    options: Array<T>
    renderOption: (option: T) => React.ReactNode
}) {
    const { label, options, renderOption, ...selectProps } = props
    const [field, meta] = useField(props.name)
    const { setFieldValue } = useFormikContext<T>()

    const handleChange = (_: any, value: SelectOption<unknown>) => {
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
                            borderRadius: 0,
                            width: "100%",
                        }
                    },
                    listbox: {
                        sx: {
                            borderRadius: 0,
                            boxShadow: "sm",
                            borderColor: "success.400",
                            width: "100%",
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

