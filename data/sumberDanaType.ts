import { SumberDanaTypeData } from "@/types/SumberDana"
import {
    BsBank as BankIcon,
    BsCash as MoneyIcon,
} from "react-icons/bs"
import {
    HiOutlineWallet as EWalletIcon,
} from "react-icons/hi2"

export const sumberDanaType: Array<SumberDanaTypeData> = [
    {
        label: "bank",
        labelText: "Rekening Bank",
        icon: BankIcon,
    },
    {
        label: "e-wallet",
        labelText: "E-Wallet",
        icon: EWalletIcon,
    }, {
        label: "cash",
        labelText: "Uang Tunai",
        icon: MoneyIcon,
    }
]

