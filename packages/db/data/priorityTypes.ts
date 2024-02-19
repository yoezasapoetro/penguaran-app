import {
    MdFiberManualRecord as LowPriority,
    MdRadioButtonChecked as MediumPriority,
    MdFiberSmartRecord as HighPriority,
} from "react-icons/md"
import { LabelIconTypeLists } from "./dataTypes"

const priorityColors: Record<string, string> = {
    low: "#cccccc",
    medium: "#808080",
    high: "#ff0000",
}

const priorityText: Record<string, string> = {
    low: "Prioritas rendah",
    medium: "Prioritas medium",
    high: "Prioritas tinggi",
}

const list: LabelIconTypeLists = [
    {
        label: 3,
        labelText: priorityText.high,
        icon: HighPriority,
        iconColor: priorityColors.high,
    },
    {
        label: 2,
        labelText: priorityText.medium,
        icon: MediumPriority,
        iconColor: priorityColors.medium,
    },
    {
        label: 1,
        labelText: priorityText.low,
        icon: LowPriority,
        iconColor: priorityColors.low,
    },
]

export default list
