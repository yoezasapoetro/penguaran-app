import * as React from "react"
import {
    Button,
    Radio,
    RadioGroup,
    Stack,
    CircularProgress,
    radioClasses,
    buttonClasses,
    colors,
    Box,
    Typography,
} from "@mui/joy"
import { SxProps } from "@mui/joy/styles/types"
import {
    BsSquare as UncheckedIcon,
    BsCheckSquareFill as CheckedIcon,
} from "react-icons/bs"
import ModalForm, { ModalFormProps } from "./ModalForm"

const radioGroupSx: SxProps = {
    flexDirection: "column",
    [`& .${radioClasses.checked}`]: {
        backgroundColor: "unset",
        border: "unset",
        borderColor: "unset",
    },
    [`& .${radioClasses.root}`]: {
        flexDirection: "row-reverse",
        py: "0.75rem",
        px: "0.5rem",
    },
    [`& .${radioClasses.radio}`]: {
        backgroundColor: "unset",
        border: "unset",
        borderColor: "unset",
    },
    [`& .${radioClasses.label}`]: {
        margin: 0,
    },
}

function PickerForm(props: {
    result: Array<Partial<Record<string, any>>>
    setCheckedValue: (value: number) => void
    checkedValue: number
    onClose: () => void
    children: React.ReactNode
}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setCheckedValue(Number(e.target.value))
    }

    return (
        <Stack
            useFlexGap
            sx={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                position: "relative",
                rowGap: 1,
                pb: 4,
            }}
        >
            {!props.result.length ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        rowGap: 1,
                    }}
                >
                    <CircularProgress
                        color="success"
                        sx={{ "--CircularProgress-progressColor": colors.green[400] }}
                    />
                    <Typography
                        width="100%"
                        textAlign="center"
                        textColor="primary.900"
                    >
                        Memuat data...
                    </Typography>
                </Box>
            ) : (
                <RadioGroup
                    name="kategoriPengeluaran"
                    sx={radioGroupSx}
                    value={props.checkedValue}
                    onChange={handleChange}
                >
                    {props.result && props.result.map((item) => (
                        <React.Fragment key={item.id}>
                            <Radio
                                id={`${item.id}`}
                                value={item.id}
                                checked={props.checkedValue === item.id}
                                checkedIcon={<CheckedIcon size={18} />}
                                uncheckedIcon={<UncheckedIcon size={18} />}
                                label={item.name}
                            />
                        </React.Fragment>
                    ))}
                </RadioGroup>
            )}
            {props.children}
            <Button
                onClick={props.onClose}
                disabled={!props.result.length}
                sx={{
                    borderRadius: 0,
                    boxShadow: "sm",
                    color: "success.400",
                    bgcolor: "primary.900",
                    [`&.${buttonClasses.disabled}`]: {
                        backgroundColor: "success.100",
                        color: "primary.600",
                    },
                }}
            >
                Pilih
            </Button>
        </Stack>
    )
}

export default function FormModalPicker(props: ModalFormProps & {
    result: Array<Partial<Record<string, any>>>
    selected: number
    hasNextPage: boolean
    fetchNextPage: () => void
    setSelected: (value: number) => void
}) {
    function handleLoadMore() {
        props.hasNextPage && props.fetchNextPage()
        return
    }

    return (
        <ModalForm
            open={props.open}
            setOpen={props.setOpen}
            modalTitle={props.modalTitle}
        >
            <PickerForm
                result={props.result}
                checkedValue={props.selected}
                setCheckedValue={props.setSelected}
                onClose={() => {
                    props.setOpen(false)
                }}
            >
                {props.hasNextPage && <Button
                    onClick={handleLoadMore}
                    variant="outlined"
                    sx={{
                        borderRadius: 0,
                        borderColor: "primary.900",
                        color: "primary.900",
                    }}
                >
                    Tampilkan lebih banyak
                </Button>}
            </PickerForm>
        </ModalForm>
    )
}

