import sql from '@/lib/db'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type ExpenseCategory = {
    id: number
    name: string
}

const revalidateAndRedirect = (to: string): void => {
    revalidatePath(to)
    redirect(to)
}

export async function addCategory(data: FormData) {
    const name = data.get("nama_jenis_pengeluaran") as string

    await sql`
            INSERT INTO
            categories (category_name)
            VALUES (${name})
        `
}

export async function getData() {
    const result = await sql<ExpenseCategory[]>`
        select c.category_id as id, c.category_name as name
        from categories c
        limit 10
    `

    return result
}

export async function removeExpenseCategory(id: number) {
    try {
        await sql`delete from categories where category_id = ${id}`
    } catch (error) {
        console.error('removeExpenseCategory:', error)
    }

    revalidatePath("/pengaturan/jenis_pengeluaran")
}
