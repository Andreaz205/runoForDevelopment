import {VariantsInOrder} from "@/ui/Cart/OrderForm/OrderForm";

export type IDeliveryType = 'delivery' | 'pickup'

export type IPaymentVariant = 'cash'| 'card'| 'partials'| 'out_variant'



export interface IOrderInput {
    user_name: string
    address: string
    comment: string
    email: string
    phone: number
    delivery_type: IDeliveryType
    payment_variant: IPaymentVariant
    price: number
    variants: VariantsInOrder[]

}
