import { Card } from "@/app/components/card"
import { addCategory } from '@/repository/ExpenseCategory'

const containerClass = `
    py-3 px-2
`
const formClass = `
    flex flex-col gap-1 w-full
`
const inputClass = `
    border border-gray-300 rounded-md
`
const submitButtonClass = `
    my-1 px-5 py-[0.4rem] w-fit rounded-full bg-green-700 text-white
`

export default function Form() {

    return (
        <div className={containerClass}>
            <Card className="drop-shadow-none">
                <form className={formClass} action={addCategory}>
                    <label htmlFor="nama">
                        Nama Pengeluaran
                    </label>
                    <input type="text" required={true} name="nama_jenis_pengeluaran" className={inputClass} />
                    <button type="submit" className={submitButtonClass}>
                        Simpan
                    </button>
                </form>
            </Card>
        </div>
    )
}

