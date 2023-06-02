import { twMerge } from 'tailwind-merge'
import {
    ArrowRightOnRectangleIcon,
    TrashIcon,
    PencilIcon
} from '@heroicons/react/24/outline'
import { SignOutButton } from "@clerk/nextjs"

const iconClassName = `h-4 w-4`

interface EditingButtonProps {
    editClick: () => void,
    removeClick: () => void,
    className?: string
}

export const LogoutButton = () => {
    const logoutButtonClassName = `
        w-full py-2
        flex justify-center items-center gap-x-2
        rounded-full bg-red-700
        text-white
    `
    return (
        <SignOutButton>
            <button className={logoutButtonClassName}>
                <ArrowRightOnRectangleIcon className={twMerge(iconClassName, '!text-white')} />
                Keluar dari Aplikasi
            </button>
        </SignOutButton>
    )
}

export const EditButton = ({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button onClick={onClick}>
        <PencilIcon className='h-4 w-4' />
    </button>
}

export const DeleteButton = ({ ...attributes }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button {...attributes}>
        <TrashIcon className='h-4 w-4' />
    </button>
}

export const EditingButton = ({ editClick, removeClick, className }: EditingButtonProps) => {
    return (
        <div className={twMerge('flex gap-x-2', className)}>
            <EditButton onClick={editClick} />
            <DeleteButton onClick={removeClick} />
        </div>
    )
}

