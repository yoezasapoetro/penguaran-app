import { IconType } from "react-icons"

export type DataType = {
    label: string | number
    group: string
}

export type LabelIconType = Omit<DataType, "group"> & {
    labelText: string
    icon: IconType
    iconColor?: string
}

export type DataTypeLists = Array<DataType>
export type LabelIconTypeLists = Array<LabelIconType>
