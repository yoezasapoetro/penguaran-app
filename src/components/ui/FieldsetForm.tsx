import { Stack } from "@mui/joy"
import { SxProps } from "@mui/joy/styles/types"

export default function FieldsetForm(props: {
    children: React.ReactNode
    sx?: SxProps
}) {
    return (
        <Stack
            useFlexGap
            component="fieldset"
            sx={{
                height: "100%",
                marginInline: 0,
                paddingBlock: 0,
                paddingInline: 0,
                borderWidth: 0,
                width: "100%",
                rowGap: "0.5rem",
                ...props.sx,
            }}
        >
            {props.children}
        </Stack>
    )
}

