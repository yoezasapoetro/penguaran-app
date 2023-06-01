import { TextSmall } from "@/app/components/Text"
import { Card } from "@/app/components/card"

export default function Penjual() {
    const containerClassName = `
        flex flex-col gap-y-3 justify-center
        py-2 px-2 divide-y divide-green-100
    `
    return (
        <article className={containerClassName}>
            <Card>
                <TextSmall>
                    Data laporan transaksi anda semakin kuat setiap waktu dengan menambahkan
                    data penjual yang pernah bertransaksi dengan anda.
                </TextSmall>
            </Card>
            <Card>
            </Card>
        </article>
    )
}
