import * as React from "react"
import { Stack, Divider, colors } from "@mui/joy"

export interface DataWrapperType<T> {
    data: Array<T> | undefined
    renderItem: (item: T) => React.ReactNode
}

export default function DataWrapper<T>(props: DataWrapperType<T>) {
    return (props.data && props.data.length > 0 &&
        <Stack
            useFlexGap
            height="100%"
            divider={<Divider sx={{ '--Divider-lineColor': colors.grey[100] }} />}
            spacing={1}
        >
            {props.data.map(props.renderItem)}
        </Stack>
    )
}
