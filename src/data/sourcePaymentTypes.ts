import { BankIcon, EWalletIcon, MoneyIcon } from "components/icons"
import { LabelIconTypeLists } from "./dataTypes"

const labelTexts: Record<string, string> = {
    bank: "Rekening Bank",
    eWallet: "E-Wallet",
    cash: "Uang Tunai"
}

const list: LabelIconTypeLists = [
    {
        label: "bank",
        labelText: labelTexts.bank,
        icon: BankIcon,
    },
    {
        label: "e-wallet",
        labelText: labelTexts.eWallet,
        icon: EWalletIcon,
    }, {
        label: "cash",
        labelText: labelTexts.cash,
        icon: MoneyIcon,
    }
]

export default list
