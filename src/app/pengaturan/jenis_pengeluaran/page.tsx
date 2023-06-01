import { TextSmall } from "@/app/components/Text"
import { Card } from "@/app/components/card"

export default function JenisPengeluaran() {
    const containerClassName = `
        flex flex-col gap-y-3 justify-center
        py-2 px-2 divide-y divide-green-100
    `
    return (
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
            </Card>
        </article>
    )
}
