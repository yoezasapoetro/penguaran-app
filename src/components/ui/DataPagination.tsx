import { useEffect, useState } from "react"
import {
    colors,
    IconButton,
    IconButtonProps,
    Stack,
    Typography,
} from "@mui/joy"
import {
    IoArrowBackCircleOutline as BackIcon,
    IoArrowForwardCircleOutline as NextIcon,
} from "react-icons/io5"

export default function DataPagination(props: {
    currentPage: number
    totalPage: number
    onPageChange: (page: number) => void
}) {
    const [showNext, setShowNext] = useState(true)
    const [showPrevious, setShowPrevious] = useState(true)

    const iconProps: IconButtonProps = {
        variant: "plain",
    }

    const isDisabled = (state: boolean) => state ? colors.grey[200] : colors.blue[900]

    useEffect(() => {
        setShowPrevious(!(props.totalPage === 1 || props.currentPage <= 1))
        setShowNext(!(props.totalPage === props.currentPage))
    }, [props.totalPage, props.currentPage])

    return (
        <Stack
            useFlexGap
            direction="row"
            alignItems="center"
            justifyContent="space-around"
        >
            <IconButton
                {...iconProps}
                disabled={!showPrevious}
                onClick={() => {
                    let _curr = props.currentPage

                    if (_curr - 1 !== 0) props.onPageChange(1)
                    else props.onPageChange(_curr - 1)
                }}
            >
                <BackIcon size={25} color={isDisabled(!showPrevious)} />
            </IconButton>
            <Typography
                lineHeight="sm"
                fontWeight={500}
                textColor="primary.900"
            >
                {props.currentPage}
                {" / "}
                {props.totalPage}
            </Typography>
            <IconButton
                {...iconProps}
                disabled={!showNext}
                onClick={() => {
                    let _curr = props.currentPage

                    if (_curr + 1 > props.totalPage) props.onPageChange(props.totalPage)
                    else props.onPageChange(_curr + 1)
                }}
            >
                <NextIcon size={25} color={isDisabled(!showNext)} />
            </IconButton>
        </Stack>
    )
}


