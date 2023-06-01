import { ArrowRightCircleIcon } from "@heroicons/react/24/outline"
import { Card } from "@/app/components/card"

const InfoButton = () => {
    return <button>
        <ArrowRightCircleIcon className="h-6 w-6 text-green-900" />
    </button>
}

export default function Home() {
    return (
        <>
            <div className="flex flex-col w-fit">
                <h1 className="text-2xl leading-none font-bold">Penguaran App</h1>
                <p className="text-xs self-end leading-none">by Nanapot</p>
            </div>
            <main className="flex flex-col gap-y-3 justify-start mt-4 px-3">
                <Card className="drop-shadow-none py-2 flex flex-col gap-y-2">
                    <p className="text-sm">Total Transaksi</p>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Minggu ini</p>
                            <h3 className="font-semibold">Rp. 1.000.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Minggu Lalu</p>
                            <h3 className="font-semibold">Rp. 1.200.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">18%</h3>
                        </div>
                    </Card>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Bulan ini</p>
                            <h3 className="font-semibold">Rp. 1.000.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Bulan Lalu</p>
                            <h3 className="font-semibold">Rp. 1.200.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">+8%</h3>
                        </div>
                    </Card>
                </Card>
                <Card className="drop-shadow-none py-2 flex flex-col gap-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">Transaksi per Sumber Dana</p>
                        <InfoButton />
                    </div>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jumlah</p>
                            <h3 className="font-semibold">Rp. 1.000.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">88%</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Sumber Dana</p>
                            <h3 className="font-semibold">Kartu Kredit</h3>
                        </div>
                    </Card>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jumlah</p>
                            <h3 className="font-semibold">Rp. 400.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">12%</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Sumber Dana</p>
                            <h3 className="font-semibold">OVO</h3>
                        </div>
                    </Card>
                </Card>
                <Card className="drop-shadow-none py-2 flex flex-col gap-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">Transaksi per Jenis Pengeluaran</p>
                        <InfoButton />
                    </div>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jumlah</p>
                            <h3 className="font-semibold">Rp. 10.000.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">54%</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jenis</p>
                            <h3 className="font-semibold">Bahan Makanan</h3>
                        </div>
                    </Card>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jumlah</p>
                            <h3 className="font-semibold">Rp. 4.000.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">34%</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jenis</p>
                            <h3 className="font-semibold">Makanan</h3>
                        </div>
                    </Card>
                    <Card className="grid grid-cols-3">
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jumlah</p>
                            <h3 className="font-semibold">Rp. 1.000.000</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Persentase</p>
                            <h3 className="font-semibold">12%</h3>
                        </div>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm">Jenis</p>
                            <h3 className="font-semibold">Jalan jalan</h3>
                        </div>
                    </Card>
                </Card>
            </main>
        </>
    )
}
