"use client"

import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { Card } from '@/app/components/card'
import { TextSmall } from '@/app/components/Text'
import {
    ClipboardDocumentIcon,
    BuildingLibraryIcon,
    BuildingStorefrontIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'

import {
    EditingButton,
    EditButton,
    LogoutButton
} from './button'

const iconClassName = `h-4 w-4 `

const SettingTitle = ({ title, icon }: { title: string, icon: JSX.Element }) => {
    return <h5 className="text-md  mb-1 flex gap-x-1 items-center">
        {icon} {" "} {title}
    </h5>
}

const SettingSubcontainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-3 bg-white py-3 rounded-sm">
            {children}
        </div>
    )
}

const SectionContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={twMerge('flex flex-col gap-y-2 mb-2', className)}>
            {children}
        </div>
    )
}

export default function Pengaturan() {
    const containerClassName = `
        flex flex-col gap-y-3 justify-center
        py-2 px-2 divide-y divide-green-100
    `
    return (
        <article className={containerClassName}>
            <SettingSubcontainer>
                <SettingTitle icon={<ClipboardDocumentIcon className={iconClassName} />} title="Jenis Pengeluaran" />
                <Card>
                    <TextSmall className="mt-1">
                        Anda mempunyai lebih{" "}
                        <strong>1</strong>{" "}
                        jenis pengeluaran saat ini. Klik tombol dibawah ini untuk menambahkan
                    </TextSmall>
                </Card>
                <div className="mt-2">
                    <Link className="text-sm  px-2 rounded-full bg-white border border-green-700 border-solid" href="/pengaturan/jenis_pengeluaran">
                        Buat jenis pengeluaran baru
                    </Link>
                </div>
            </SettingSubcontainer>
            <SettingSubcontainer>
                <SettingTitle icon={<BuildingLibraryIcon className={iconClassName} />} title="Sumber Dana" />
                <TextSmall>
                    Sumber dana digunakan untuk metode pembayaran dari pengeluaran yang anda keluarkan. {" "}
                </TextSmall>
                <Card className="mt-2 flex flex-col">
                    <div className="grid grid-cols-3">
                        <div>
                            <p className="text-xs">Sumber Dana</p>
                            <TextSmall className='font-semibold'>Kartu Kredit BCA</TextSmall>
                        </div>
                        <div>
                            <p className='text-xs'>Tanggal Entri</p>
                            <TextSmall className='font-semibold'>03/04/2022</TextSmall>
                        </div>
                        <EditingButton
                            className='justify-self-end'
                            editClick={() => { console.error('editClick') }}
                            removeClick={() => { console.error('removeClick') }}
                        />
                    </div>
                </Card>
                <Card className="mt-2 flex flex-col">
                    <div className="grid grid-cols-3">
                        <div>
                            <p className="text-xs">Sumber Dana</p>
                            <TextSmall className='font-semibold'>Gopay</TextSmall>
                        </div>
                        <div>
                            <p className='text-xs'>Tanggal Entri</p>
                            <TextSmall className='font-semibold'>03/04/2022</TextSmall>
                        </div>
                        <EditingButton
                            className='justify-self-end'
                            editClick={() => { console.error('editClick') }}
                            removeClick={() => { console.error('removeClick') }}
                        />
                    </div>
                </Card>
                <Card className="mt-2 flex flex-col">
                    <div className="grid grid-cols-3">
                        <div>
                            <p className="text-xs">Sumber Dana</p>
                            <TextSmall className='font-semibold'>OVO</TextSmall>
                        </div>
                        <div>
                            <p className='text-xs'>Tanggal Entri</p>
                            <TextSmall className='font-semibold'>03/04/2022</TextSmall>
                        </div>
                        <EditingButton
                            className='justify-self-end'
                            editClick={() => { console.error('editClick') }}
                            removeClick={() => { console.error('removeClick') }}
                        />
                    </div>
                </Card>
            </SettingSubcontainer>
            <SettingSubcontainer>
                <SettingTitle icon={<BuildingStorefrontIcon className={iconClassName} />} title="Penjual" />
                <Card>
                    <TextSmall className="mt-1">
                        Anda telah memiliki data penjual sebanyak{" "}
                        <strong>100</strong>{" "} saat ini. Klik tombol dibawah ini untuk menambahkan
                    </TextSmall>
                </Card>
                <div className="mt-2">
                    <Link
                        className="text-sm px-2 rounded-full bg-white border border-green-700 border-solid"
                        href="/pengaturan/penjual">
                        Entri baru penjual
                    </Link>
                </div>
            </SettingSubcontainer>
            <SettingSubcontainer>
                <SettingTitle icon={<UserCircleIcon className={iconClassName} />} title="Akun" />
                <p className=''>Data Pribadi</p>
                <SectionContainer>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Nama</p>
                            <TextSmall className='font-semibold'>John dow</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Kota</p>
                            <TextSmall className='font-semibold'>Tennessee</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">No. Telp</p>
                            <TextSmall className='font-semibold'>(123) 456</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Jenis Kelamin</p>
                            <TextSmall className='font-semibold'>Laki-laki</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Tanggal Lahir</p>
                            <TextSmall className='font-semibold'>03/04/1992</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                </SectionContainer>
                <p className=''>Data Akun</p>
                <SectionContainer>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Alamat E-Mail</p>
                            <TextSmall className='font-semibold'>john@dow.com</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Username</p>
                            <TextSmall className='font-semibold'>johndow</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                    <Card className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Password</p>
                            <TextSmall className='font-semibold'>********</TextSmall>
                        </div>
                        <EditButton onClick={() => { console.error('editClick 21') }} />
                    </Card>
                </SectionContainer>
            </SettingSubcontainer>
            <LogoutButton />
        </article>
    )
}
