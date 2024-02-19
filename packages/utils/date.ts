import {
    formatDistanceToNow,
    parseJSON,
    isAfter,
} from "date-fns"
import { id } from "date-fns/locale"

const UPDATED_TEXT_DATE = "diubah"
const CREATED_TEXT_DATE = "dibuat"

export function dateFormat(date: string) {
    const createdAt = parseJSON(date)
    return formatDistanceToNow(createdAt, {
        addSuffix: true,
        locale: id
    })
}

export function dataLogDate({ createdAt, updatedAt }: {
    createdAt: string
    updatedAt: string
}) {
    const _createdAt = parseJSON(createdAt)
    const _updatedAt = parseJSON(updatedAt)

    if (isAfter(_updatedAt, _createdAt)) {
        return {
            date: dateFormat(updatedAt),
            textDate: UPDATED_TEXT_DATE,
        }
    } else {
        return {
            date: dateFormat(createdAt),
            textDate: CREATED_TEXT_DATE,
        }
    }
}

