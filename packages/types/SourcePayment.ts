export type SourcePayment = {
    id: number
    name: string
    type: string
    createdAt: string
    updatedAt: string
}

export type SourcePaymentItemsReturn = IItemsReturn<SourcePayment>
export type SourcePaymentItemReturn = Awaited<IItemReturn<SourcePayment>>
export type SourcePaymentFormProps = IFormProps<SourcePayment>
