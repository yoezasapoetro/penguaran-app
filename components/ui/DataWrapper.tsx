import {
    Stack,
    Divider,
    colors,
} from "@mui/joy"

export default function DataWrapper(props: {
    data: Array<any> | undefined
    renderItem: (item: any) => React.ReactNode
}) {
    return (
        <Stack
            useFlexGap
            height="100%"
            divider={<Divider sx={{ '--Divider-lineColor': colors.grey[100] }} />}
            spacing={1}
        >
            {props.data?.map(props.renderItem)}
        </Stack>
    )
}

