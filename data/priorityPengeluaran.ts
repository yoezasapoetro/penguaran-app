import {
    MdFiberManualRecord as LowPriority,
    MdRadioButtonChecked as MediumPriority,
    MdFiberSmartRecord as HighPriority,
} from "react-icons/md"

import { priorityColors } from "@/components/colors"
import { PrioritasPengeluaranData } from "@/types/KategoriPengeluaran"

export const prioritasPengeluaranData: Array<PrioritasPengeluaranData> = [
    {
        label: 1,
        labelText: "Prioritas rendah",
        icon: LowPriority,
        iconColor: priorityColors.low,
    },
    {
        label: 2,
        labelText: "Prioritas medium",
        icon: MediumPriority,
        iconColor: priorityColors.medium,
    }, {
        label: 3,
        labelText: "Prioritas tinggi",
        icon: HighPriority,
        iconColor: priorityColors.high,
    }
]

