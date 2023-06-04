"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    HomeIcon as HomeIconSolid,
    Cog6ToothIcon as SettingIconSolid,
    PlusCircleIcon
} from '@heroicons/react/24/solid'
import {
    HomeIcon as HomeIconOutline,
    Cog6ToothIcon as SettingIconOutline
} from '@heroicons/react/24/outline'

interface MenuItemProps {
    icon: JSX.Element
    href: string
    name: string
    className?: string
}

const MenuItem = ({ icon, href, name, className }: MenuItemProps) => {
    const _className = twMerge("flex flex-col items-center w-fit p-1", className)
    return (
        <Link data-menu-name={name} href={href} className={_className}>
            {icon}
        </Link>
    )
}

export default function AppMenu() {
    const pathname = usePathname()

    const iconClassName = "h-6 w-6 text-green-700"
    const className = `
        flex-grow-0 flex-shrink-0
        flex items-center justify-evenly
        w-full h-fit py-2 bg-white
        border-t border-solid border-gray-200 rounded-t-3xl
        sticky bottom-0 left-0 right-0
    `
    const homeIcon = pathname === "/"
        ? <HomeIconSolid className={iconClassName} />
        : <HomeIconOutline className={iconClassName} />

    const settingIcon = pathname === "/pengaturan"
        ? <SettingIconSolid className={iconClassName} />
        : <SettingIconOutline className={iconClassName} />

    return (
        <footer className={className}>
            <MenuItem
                icon={homeIcon}
                name="home"
                href="/"
            />
            <MenuItem
                className='self-start fixed bottom-0 z-20'
                icon={<PlusCircleIcon className='h-14 w-14' />}
                name="createExpense"
                href='/pengeluaran'
            />
            <MenuItem icon={settingIcon}
                name="setting"
                href="/pengaturan"
            />
        </footer>
    )
}

