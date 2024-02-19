import * as React from "react"
import {
    useField,
    useFormikContext,
} from "formik"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    RadioGroup,
    Radio,
    Sheet,
    Typography,
    colors,
    radioClasses,
    Box,
} from "@mui/joy"

import {
    GoCheckCircleFill as CheckedIcon,
} from "react-icons/go"
import { SxProps } from "@mui/joy/styles/types"

const radioGroupSxProps: SxProps = {
    margin: 0,
    gap: 2,
    [`& .${radioClasses.checked}`]: {
        [`& .${radioClasses.action}`]: {
            inset: -1,
            border: "2px solid",
            borderColor: "success.300",
        },
    },
    [`& .${radioClasses.radio}`]: {
        display: "contents",
        ['& > div']: {
            zIndex: 2,
            position: "absolute",
            top: "-11px",
            right: "-11px",
        }
    }
}

export default function FormRadioGroup(props: {
    label: string
    name: string
    placeholder: string
    defaultValue: any
    options: Array<any>
    hasIconDecorator?: boolean
}) {
    const { label, options, hasIconDecorator = false, ...radioGroupProps } = props
    const [field, meta] = useField(props.name)
    const { setFieldValue } = useFormikContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(props.name, e.target.value)
    }

    const fieldId = `radio-label-${props.name}`

    return (
        <FormControl error={Boolean(meta.error && meta.touched)}>
            <FormLabel
                id={fieldId}
            >
                {label}
            </FormLabel>
            <RadioGroup
                {...radioGroupProps}
                overlay
                aria-labelledby={fieldId}
                value={field.value}
                onChange={handleChange}
                sx={radioGroupSxProps}
            >
                {options.map((item) => {
                    const checkIconSize = 22
                    return (
                        <Sheet
                            key={item.label}
                            variant="outlined"
                            sx={{
                                boxShadow: "sm",
                                borderRadius: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.8,
                                p: 1.5,
                                minWidth: 120,
                            }}
                        >
                            {hasIconDecorator && React.createElement(item.icon, {
                                color: item.iconColor,
                                size: 20,
                            })}
                            <Radio
                                id={item.labelText}
                                value={item.label}
                                checkedIcon={
                                    <Box
                                        sx={{
                                            backgroundColor: "white",
                                            margin: 0,
                                            padding: 0,
                                            borderRadius: 50,
                                            height: checkIconSize,
                                            width: checkIconSize,
                                        }}
                                    >
                                        <CheckedIcon
                                            size={checkIconSize}
                                            color={colors.green[300]}
                                        />
                                    </Box>
                                }
                            />
                            <Typography>
                                {item.labelText}
                            </Typography>
                        </Sheet>
                    )
                })}
            </RadioGroup>
            {meta.error && meta.touched && <FormHelperText>
                {meta.error}
            </FormHelperText>}
        </FormControl>
    )
}

