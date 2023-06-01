import { twMerge } from 'tailwind-merge'
import {
    ArrowRightOnRectangleIcon,
    TrashIcon,
    PencilIcon
} from '@heroicons/react/24/outline'

const iconClassName = `h-4 w-4`

interface EditingButtonProps {
    editClick: React.MouseEventHandler,
    removeClick: React.MouseEventHandler,
    className?: string
}

export const LogoutButton = () => {
    const logoutButtonClassName = `
        w-full py-2
        flex justify-center items-center gap-x-2
        rounded-full bg-red-700
        text-white
    `
    return <button className={logoutButtonClassName}>
        <ArrowRightOnRectangleIcon className={twMerge(iconClassName, '!text-white')} />
        Keluar dari Aplikasi
    </button>
}

export const EditButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return <button onClick={onClick}>
        <PencilIcon className='h-4 w-4' />
    </button>
}

export const EditingButton = ({ editClick, removeClick, className }: EditingButtonProps) => {
    return (
        <div className={twMerge('flex gap-x-2', className)}>
            <button onClick={editClick}>
                <PencilIcon className='h-4 w-4' />
            </button>
            <button onClick={removeClick}>
                <TrashIcon className='h-4 w-4' />
            </button>
        </div>
    )
}
