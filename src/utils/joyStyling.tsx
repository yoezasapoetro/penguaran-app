import { SxProps } from "@mui/joy/styles/types";
import { radioClasses } from "@mui/joy";

export const pickerInputSxProps: SxProps = {
    width: "100%",
    '--Input-radius': 0,
    '--Input-focusedThickness': 1,
}

export const radioGroupSxProps: SxProps = {
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

