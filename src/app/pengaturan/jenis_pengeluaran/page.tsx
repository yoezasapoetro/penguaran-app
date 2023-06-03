import Link from "next/link"
import { PlusCircleIcon as AddIcon } from '@heroicons/react/24/outline'
import { getData, removeExpenseCategory } from "@/repository/ExpenseCategory"
import { Card } from "@/app/components/card"
import { TextSmall } from "@/app/components/Text"
import { RemoveCategory } from "./button"

export const revalidate = 86400

export default async function JenisPengeluaran() {
    const containerClassName = `
        flex flex-col gap-y-3 justify-center
        py-2 px-2 divide-y divide-green-100
    `

    const expenseCategories = await getData()
    const isEmpty = !expenseCategories.length

    return (
        <>
            <article className={containerClassName}>
                <Card>
                    <TextSmall>
                        Tentukan berbagai jenis pengeluaran anda, contoh:{" "}
                        <strong>makanan, bahan makanan, minuman, dan lain-lain.</strong>{" "}
                        Sistem akan melakukan kalkulasi pengeluaran dalam rentang waktu tertentu, anda
                        tidak perlu khawatir untuk mengelompokkan jenis pengeluaran berdasarkan waktu.
                    </TextSmall>
                </Card>
                <Card>
                    <div className='flex items-center justify-between py-1 border-b border-green-100'>
                        <p className='text-sm'>Jumlah data <span className='font-semibold'>{expenseCategories.length}</span></p>
                        <Link className='flex gap-x-1' href={"/pengaturan/jenis_pengeluaran/form"}>
                            <AddIcon className="h-5 w-5 text-green-900" />
                        </Link>
                    </div>
                    <div className='py-1 flex flex-col gap-y-2 items-center'>
                        {isEmpty && (
                            <p className="italic text-green-700 py-2">Belum ada jenis pengeluaran.</p>
                        )}
                        {expenseCategories.map((category) => {
                            return <Card className='flex items-center justify-between w-full' key={category.id}>
                                {category.name}
                                <RemoveCategory remove={removeExpenseCategory} categoryId={category.id} />
                            </Card>
                        })}
                    </div>
                </Card>
            </article>
        </>
    )
}
