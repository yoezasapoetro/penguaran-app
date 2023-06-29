import {
    Stack,
    Divider,
} from "@mui/joy"

import colors from "../colors"

export default function DataWrapper(props: {
    data: Array<any> | undefined
    renderItem: (item: any) => React.ReactNode
}) {
    return (
        <Stack
            useFlexGap
            height="100%"
            divider={<Divider sx={{ borderColor: colors.neutral }} />}
            spacing={1}
        >
            {props.data?.map(props.renderItem)}
        </Stack>
    )
}

