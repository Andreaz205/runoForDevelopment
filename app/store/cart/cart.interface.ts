export interface ICartInitialState {
    isLoading: boolean
    cart: ICartItem[]
    amount: number
    sum: number
}

export interface ICartItem{
    count: number;
    code: null|string
    created_at: string
    id: number
    images: []
    old_price: null|string
    optionNames: []
    price: number
    product: Object
    product_id: number
    purchase_price: null|number
    quantity: null|number
    related: []
    size: null|string
    updated_at: string
    variantValues: []
    weight: null|number
    wholesale_price: null|number
}