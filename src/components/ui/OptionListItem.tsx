import { ListItemContent, Option, Typography } from "@mui/joy";
import { DataType } from "db/data/dataTypes";

export default function OptionListItem(props: DataType) {
    return (
        <Option
            value={props.label}
            sx={{
                maxWidth: "calc(100vw - 2rem)",
            }}
        >
            <ListItemContent
                sx={{
                    fontSize: "md",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                }}
            >
                {props.label}
                <Typography
                    fontSize="sm"
                    fontWeight={500}
                    sx={{
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                        hyphens: "manual",
                    }}
                >
                    {props.group}
                </Typography>
            </ListItemContent>
        </Option>
    )
}
