import * as React from "react"
import { useField } from "formik"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    InputProps,
    Input,
} from "@mui/joy"
import { Dayjs } from "dayjs"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {
    BaseSingleInputFieldProps,
    MobileDatePicker,
    DatePickerProps,
    DateValidationError,
    FieldSection,
    LocalizationProvider,
    UseDateFieldProps,
} from "@mui/x-date-pickers"
import { unstable_useDateField as useDateField } from "@mui/x-date-pickers/DateField"

interface JoyFieldProps extends InputProps {
    label?: React.ReactNode
    name: string
    InputProps?: {
        ref?: React.Ref<any>
        endAdorment?: React.ReactNode
        startAdorment?: React.ReactNode
    }
    isError: boolean
    errorMessage: string
}

type JoyFieldComponent = ((
    props: JoyFieldProps & React.RefAttributes<HTMLDivElement>
) => JSX.Element) & { propTypes?: any }

const JoyField = React.forwardRef(
    function JoyField(props: JoyFieldProps, inputRef: React.Ref<HTMLInputElement>) {
        const {
            label,
            isError,
            errorMessage,
            placeholder,
            InputProps: { ref: containerRef } = {},
            ...other
        } = props

        // @ts-ignore
        const { inputProps, ownerState: { value: fieldValue }, ...dateFieldInputProps } = other

        function formatSelectedDate(dateStr: string) {
            const formatted = dayjs(dateStr).locale("id").format("DD MMMM YYYY")
            return !!dateStr && formatted || ""
        }

        return (
            <FormControl
                error={isError}
                sx={[
                    { flexGrow: 1 },
                ]}
                ref={containerRef}
            >
                <FormLabel
                    sx={{
                        color: "primary.900",
                    }}
                >
                    {label}
                </FormLabel>
                <Input
                    {...dateFieldInputProps}
                    error={isError}
                    value={formatSelectedDate(fieldValue)}
                    placeholder={placeholder}
                    slotProps={{ input: { ref: inputRef } }}
                    sx={{
                        width: "100%",
                                   fontSize: "md",
                        '--Input-radius': 0,
                        '--Input-focusedThickness': 1,
                    }}
                />
                {isError && <FormHelperText>
                    {errorMessage}
                </FormHelperText>}
            </FormControl>
        )
    }
) as JoyFieldComponent

interface JoyDateFieldProps
    extends
    UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
        Dayjs | null,
        Dayjs,
        FieldSection,
        DateValidationError
    > { }

function JoyDateField(props: JoyDateFieldProps) {
    const { inputRef: externalInputRef, slots, slotProps, ...textFieldProps } = props

    const result = useDateField<Dayjs, typeof textFieldProps>({
        props: textFieldProps,
        inputRef: externalInputRef
    })

    // @ts-ignore
    return <JoyField {...result} />
}

export default function DateInput(props: DatePickerProps<Dayjs> & {
    placeholder: string
    name: string
    label: string
}) {
    const { placeholder, name, label, ...datePickerProps } = props
    const [field, meta, helpers] = useField(props.name)

    function handleSelected(val: Dayjs | null) {
        helpers.setValue(val?.toDate())
    }

    return (
        <LocalizationProvider adapterLocale="id" dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                {...datePickerProps}
                view="day"
                value={field.value}
                onAccept={handleSelected}
                slots={{ field: JoyDateField, ...props.slots }}
                slotProps={{
                    field: {
                        name,
                        placeholder,
                        label,
                        isError: Boolean(meta.touched && meta.error),
                        errorMessage: meta.error
                    } as any
                }}
            />
        </LocalizationProvider>
    )
}

